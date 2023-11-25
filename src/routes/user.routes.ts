import { Router, Request, Response } from 'express'

const userRouter = Router()

userRouter.get('/', (req: Request, res: Response): void => {
  const users = ['Goon', 'Tsuki', 'Joe']
  res.status(200).send(users)
})

export default userRouter
