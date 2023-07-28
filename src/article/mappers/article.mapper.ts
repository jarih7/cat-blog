import { toCommentDto } from '../../comment/mappers/comment.mapper';
import { Article } from '../article.entity';
import {
  ArticleDetailDto,
  ArticleDto,
  UpdateArticleDto,
} from '../dto/article.dto';

export const mapUpdatedArticleFields = (
  existing: Article,
  updated: UpdateArticleDto,
) => {
  existing.title = updated.title;
  existing.perex = updated.perex;
  existing.articleContent.content = updated.content;
  existing.lastUpdatedAt = new Date();
};

export const toArticleDto = (article: Article): ArticleDto => {
  const dto = new ArticleDto();
  dto.articleId = article.id;
  dto.authorId = article.author.id;
  dto.createdAt = article.createdAt.toISOString();
  dto.imageId = article.image.id;
  dto.lastUpdatedAt = article.lastUpdatedAt.toISOString();
  dto.perex = article.perex;
  dto.title = article.title;
  return dto;
};

export const toArticleDetailDto = (article: Article): ArticleDetailDto => {
  const articleDto = toArticleDto(article);
  return {
    content: article.articleContent.content,
    comments: article.comments.map(toCommentDto),
    ...articleDto,
  };
};
