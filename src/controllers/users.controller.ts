import {
  Body,
  Controller,
  Example,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from 'tsoa'
import { User } from '../models/user.model'
import { UserCreationParams, UsersService } from '../services/users.service'

@Route('api/users')
export class UsersController extends Controller {
  @Example<User>({
    id: 1,
    name: 'tsoa user',
    email: 'hello@tsoa.com',
    phoneNumbers: [],
    status: 'Happy',
  })
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
