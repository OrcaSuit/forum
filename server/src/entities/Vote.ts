import { Column, Entity } from "typeorm";
import { BaseEntity } from './Entity';

@Entity("votes")
export default class Post extends BaseEntity {
    @Column()
    value: number;

    @ManyToOne(() => User)

}