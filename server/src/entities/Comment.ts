import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from './Entity'
import { User } from "./User";
import { Exclude, Expose } from "class-transformer";
import { makeId } from "../utils/helpers";
import Post from "./Post";

@Entity("comments")
export default class Comment extends BaseEntity {
    @Index()
    @Column()
    identifier: string;

    @Column()
    body: string;

    @Column()
    username: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User

    @Column()
    postId: number;

    @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
    post: Post;

    @Exclude()
    @OneToMany(() => Vote, (Vote) => Vote.comment)
    votes: Vote[]

    protected userVote: number;

    setUserVote(user: User) { //테이블 안의 vote 보면서 투표 확인  
        const index = this.votes?.findIndex((v) => v.username === user.username);
        this.userVote = index > -1 ? this.votes[index].value : 0;
    }

    @Expose() get voteScore(): number { // vote의 총점을 구함 
        const initalValue = 0
        return this.votes?.reduce((previousValue, currentObject) => previousValue + (currentObject.value || 0), initalValue);
    }

    @BeforeInsert()
    makeId() {
        this.identifier = makeId(8);
    }

}
