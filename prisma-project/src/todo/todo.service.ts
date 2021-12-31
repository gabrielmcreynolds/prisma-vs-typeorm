import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma-service/prisma.service";
import {Prisma, Todo, User} from "@prisma/client";


type todoPaginateParams = {
    skip?: number;
    take?: number;
    where?: Prisma.TodoWhereInput,
    orderBy?: Prisma.TodoOrderByWithRelationInput;
}

@Injectable()
export class TodoService {

    constructor(private prisma: PrismaService) {}


    todo(id: number): Promise<Todo | undefined> {
        return this.prisma.todo.findUnique({
            where: {
                id
            }
        })
    }

    getUsersTodos(userId: number, params?: todoPaginateParams | undefined): Promise<Todo[]> {
        const {where, ...other} = params;
        return this.todos({
            ...other,
            where: {
                userId
            }
        })
    }

    todos(params: todoPaginateParams): Promise<Todo[]> {
        return this.prisma.todo.findMany(params);
    }

     createTodo(data: Prisma.TodoCreateInput): Promise<Todo> {
        return this.prisma.todo.create({data})
    }

    updateTodo(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
        return this.prisma.todo.update({
            where: {
                id: id,
            },
            data
        });
    }

    deleteTodo(id: number): Promise<Todo> {
        return this.prisma.todo.delete({
            where: {
                id
            }
        });
    }

}
