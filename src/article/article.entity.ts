import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ArticleContent } from './articleContent.entity';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';
import { Image } from '../image/image.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  perex: string;

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @ManyToOne(() => Image, (image) => image.articles)
  image: Image;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  lastUpdatedAt: Date;

  @OneToOne(() => ArticleContent, { cascade: ['insert'] })
  @JoinColumn()
  articleContent: ArticleContent;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}
