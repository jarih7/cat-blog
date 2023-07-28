import { Vote } from '../vote/vote.entity';
import { Article } from '../article/article.entity';
import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  @Column({
    type: 'varchar',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  postedAt: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  score: number;
}
