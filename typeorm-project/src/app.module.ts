import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodosModule} from './todos/todos.module';
import User from "./users/entities/user.entity";
import Todo from "./todos/entity/todo.entity";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot(), UsersModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DB_PASS,
        database: 'typeorm-demo',
        entities: [User, Todo],
        synchronize: true,
    }), TodosModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
