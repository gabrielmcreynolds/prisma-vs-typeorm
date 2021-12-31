import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FindConditions, ObjectLiteral, Repository} from "typeorm";
import CreateUserDto from "./dto/createUser.dto";
import UpdateUserDto from "./dto/updateUser.dto";
import User from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    }

    user(id: number, includeTodos = false): Promise<User | undefined> {
        return this.userRepo.findOne(id, {loadEagerRelations: includeTodos})
    }

    users(params: {
        skip?: number;
        take?: number;
        where?: string | ObjectLiteral | FindConditions<User> | FindConditions<User>[]
    }): Promise<User[]> {
        return this.userRepo.find({
            where: params.where,
            skip: params.skip,
            take: params.take,
            order: {id: "ASC"}
        })
    }

    async createUser(userDto: CreateUserDto): Promise<User> {
        const user = this.userRepo.create(userDto)
        return this.userRepo.save(user);
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
        const {id, ...other} = updateUserDto;
        return this.userRepo.save({
            id: +id,
            ...other
        })
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepo.delete(id);
    }
}
