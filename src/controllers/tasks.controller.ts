import {
  Body,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Res,
  Route,
  SuccessResponse,
  TsoaResponse,
} from 'tsoa'
import { Task } from '../models/task.model'

@Route('api/tasks')
export default class TasksController {
  tasks: Task[] = []

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createTask(@Body() body: Task): Promise<Task> {
    const task: Task = {
      id: this.tasks.length + 1,
      title: body.title,
      description: body.description,
      completed: false,
    }

    this.tasks.push(task)

    return task
  }

  @Get('/')
  public async getTasks(): Promise<Task[]> {
    return this.tasks
  }

  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param id The user's identifier
   * @param notFoundResponse
   */
  @Get('{id}')
  public async getTaskById(
    @Path() id: string,
    @Res() notFoundResponse?: TsoaResponse<404, { reason: string }>
  ): Promise<Task> {
    if (!id) {
      return notFoundResponse?.(404, {
        reason: "We don't know you yet. Please provide an id",
      })
    }

    return this.tasks.find((t) => t.id === parseInt(id))!
  }

  public async getTaskByIndex(@Query() id: number): Promise<number> {
    return this.tasks.findIndex((t) => t.id === id)
  }

  @Patch('/:id')
  public async updateTask(
    @Query() id: string,
    @Body() body: Partial<Task>
  ): Promise<Task> {
    const task = await this.getTaskById(id)

    task.title = body.title || task.title
    task.description = body.description || task.description
    task.completed = body.completed || task.completed

    return task
  }

  @Delete('/:id')
  public async deleteTask(id: number): Promise<any> {
    return this.tasks.splice(id, 1)
  }
}
