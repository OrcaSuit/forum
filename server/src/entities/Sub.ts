import { Expose } from "class-transformer";
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import Post from "./Post";

@Entity("subs")
export default class Sub extends BaseEntity {
    @Index()
    @Column({ unique: true })
    name: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    imageUrn: string;

    @Column()
    username: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User;

    @OneToMany(() => Post, (post => post.sub))
    posts: Post[];

    @Expose()
    get imageUrl(): string {
        return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` : //로컬 호스트 4000
            "http://www.gravatar.com/avatar?d=mp&f=y"
    }


    @Expose()
    get bannerUrl(): string {
        return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` :
            undefined;
    }
}