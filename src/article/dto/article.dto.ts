import { CommentDto } from 'src/comment/dto/comment.dto';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
  IsDateString,
  IsOptional,
} from 'class-validator';

class ArticleBaseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  perex: string;

  @IsUUID()
  @IsOptional()
  imageId: string;
}

export class ArticleDto extends ArticleBaseDto {
  @IsUUID()
  articleId: string;

  @IsUUID()
  authorId: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  lastUpdatedAt: string;
}

export class ArticleDetailDto extends ArticleDto {
  @IsString()
  content: string;

  @IsArray()
  @ValidateNested({ each: true })
  comments: CommentDto[];
}

export class UpdateArticleDto extends ArticleBaseDto {
  @IsString()
  content: string;
}

export class CreateArticleDto extends UpdateArticleDto {
  @IsUUID()
  authorId: string;
}
