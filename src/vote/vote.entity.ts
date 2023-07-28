import { Comment } from '../comment/comment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  ip: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  vote: number;

  @ManyToOne(() => Comment, (comment) => comment.votes)
  comment: Comment;
}
