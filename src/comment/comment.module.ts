import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Article } from 'src/article/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Article])],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule { }
