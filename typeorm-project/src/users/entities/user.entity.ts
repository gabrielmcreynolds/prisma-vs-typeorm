import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Todo from "../../todos/entity/todo.entity";


@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Todo, (todo) => todo.user, {eager: true})
    todos: Todo[];
}
