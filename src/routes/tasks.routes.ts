import { Router, Request, Response } from 'express'
import { Task } from '../models/task.model'
import { body, validationResult } from 'express-validator'
import TasksController from '../controllers/tasks.controller'

const tasksRouter = Router()
const tasks: Task[] = []

const taskValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('completed').isBoolean().withMessage('Completed must be a boolean'),
]

tasksRouter.post(
  '/',
  taskValidationRules,
  async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const controller = new TasksController()
    const response = await controller.createTask(req.body)

    res.status(201).json(response)
  }
)

tasksRouter.get('/', async (req: Request, res: Response) => {
  const controller = new TasksController()
  const response = await controller.getTasks()

  res.json(response)
})

tasksRouter.get('/:id', async (req: Request, res: Response) => {
  const controller = new TasksController()
  const response = await controller.getTaskById(req.params.id)

  if (!response) {
    res.status(404).send('Task not found')
  } else {
    res.json(response)
  }
})

tasksRouter.put(
  '/:id',
  taskValidationRules,
  async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const controller = new TasksController()
    const response = await controller.updateTask(req.params.id, req.body)

    if (!response) {
      res.status(404).send('Task not found')
    } else {
      res.json(response)
    }
  }
)

tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  const controller = new TasksController()
  const response = await controller.getTaskById(req.params.id)
  const index = await controller.getTaskByIndex(response.id)

  if (!index) {
    res.status(404).send('Task not found')
  } else {
    await controller.deleteTask(index)
    res.status(204).send()
  }
})

export default tasksRouter
