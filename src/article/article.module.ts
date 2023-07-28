import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleContent } from './articleContent.entity';
import { Image } from 'src/image/image.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleContent, Image, User])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
