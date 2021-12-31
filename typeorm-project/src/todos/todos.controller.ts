import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { TodosService } from './todos.service';
import CreateTodoDto from "./dto/create-todo.dto";
import Todo from "./entity/todo.entity";
import UpdateTodoDto from "./dto/update-todo.dto";
import TodosQueryDto from "./dto/todos-query.dto";

@Controller('todo')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}


  @Post()
  createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(body);
  }

  @Get(':id')
  getTodo(@Param("id") id: string): Promise<Todo> {
    return this.todoService.todo(+id)
  }

  @Put("")
  editTodo(@Body() body: UpdateTodoDto): Promise<Todo> {
    const {id, ...other} = body;
    return this.todoService.updateTodo(id, other);
  }

  @Get("user/:id")
  GetUsersTodos(@Param("id") id: number, @Query() query: TodosQueryDto): Promise<Todo[]> {
    return this.todoService.getUsersTodos(+id, (query) ? {
      take: query.take,
      skip: query.skip,
    } : null)
  }

  @Delete(":id")
  deleteTodo(@Param("id") id: number): Promise<void> {
    return this.todoService.deleteTodo(+id)
  }
}
