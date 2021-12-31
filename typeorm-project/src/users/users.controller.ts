import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import GetUserDto from "./dto/getUser.dto";
import User from "./entities/user.entity";
import UpdateUserDto from "./dto/updateUser.dto";
import CreateUserDto from "./dto/createUser.dto";

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("")
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Get("")
  async getUser(@Query() query: GetUserDto): Promise<User> {
    return this.userService.user(query.id, query.includeTodos)
  }

  @Put("")
  async editUser(@Body() body: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(body)
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<void> {
    return this.userService.deleteUser(+id)
  }
}
