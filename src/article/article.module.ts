import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleContent } from './articleContent.entity';
import { Image } from 'src/image/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleContent, Image])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule { }
