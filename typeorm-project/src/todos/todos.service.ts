import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import Todo from "./entity/todo.entity";
import {FindConditions, ObjectLiteral, Repository} from "typeorm";
import User from "../users/entities/user.entity";
import CreateTodoDto from "./dto/create-todo.dto";

type todoPaginateParams = {
    skip?: number;
    take?: number;
    where?: string | ObjectLiteral | FindConditions<User> | FindConditions<User>[]
}

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {
    }

    todo(id: number): Promise<Todo> {
        return this.todoRepo.findOne(id);
    }

    getUsersTodos(userId: number, todoParams ?: todoPaginateParams): Promise<Todo[]> {
        return this.todoRepo.find({
            where: {
                userId: userId,
            },
            skip: todoParams.skip,
            take: todoParams.take
        })
    }

    createTodo(data: CreateTodoDto): Promise<Todo> {
        const todo = this.todoRepo.create(data);
        return this.todoRepo.save(todo);
    }

    updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
        return this.todoRepo.save({
            id,
            data
        })
    }

    async deleteTodo(id: number): Promise<void> {
        await this.todoRepo.delete(id);
    }

}
