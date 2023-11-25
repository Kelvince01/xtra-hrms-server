import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import HttpStatus from "http-status-codes";
import { ValidateError } from 'tsoa'

export class CustomError {
  message: string;

  status: number;

  additionalInfo: Record<string, any>;

  constructor(message: string, status: number = 500, additionalInfo = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

export const errorHandler = (
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err;

  console.error((err as TypeError).stack)
  // res.status(500).send('Something went wrong')

  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  res.status(404).send({
    message: 'Not Found',
  })

  if (!(err instanceof CustomError)) {
    customError = new CustomError((<any>err).message);
  }

  if (err instanceof ZodError) {
    customError = new CustomError(
      "Validation error",
      HttpStatus.BAD_REQUEST,
      err.issues
    );
  }

  res.status((customError as CustomError).status).json(customError);
  next()
};
