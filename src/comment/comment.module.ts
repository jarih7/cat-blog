import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
import { Vote } from '../vote/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Article, Vote])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
