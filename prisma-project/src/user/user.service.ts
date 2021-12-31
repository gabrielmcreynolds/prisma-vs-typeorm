import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma-service/prisma.service";
import {User, Prisma} from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
    }

    async user(id: number, includeTodos = false): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                todos: includeTodos,
            }
        })
    }

    async users(params: {
        skip?: number;
        take?: number;
        where?: Prisma.UserWhereInput,
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        return this.prisma.user.findMany(params);
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({data,})
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: {
                id
            },
            data
        });
    }

    async deleteUser(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: {
                id
            },
            include: {
                todos: true,
            },
        })
    }
}
