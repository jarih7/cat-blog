import { IsDateString, Min, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
  @IsUUID()
  articleId: string;

  @IsUUID()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CommentDto {
  @IsUUID()
  commentId: string;

  @IsUUID()
  @IsOptional()
  articleId: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  postedAt: string;

  @IsNumber()
  @Min(0)
  score: number;
}
