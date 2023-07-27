import { CommentDto } from "src/comment/dto/comment.dto";

class ArticleBaseDto {
    authorId: string;
    title: string;
    perex: string;
    imageId: string;
}

export class ArticleDto extends ArticleBaseDto {
    articleId: string;
    createdAt: string;
    lastUpdatedAt: string;
}

export class ArticleDetailDto extends ArticleDto {
    content: string;
    comments: CommentDto[];
}

export class CreateArticleDto extends ArticleBaseDto {
    content: string;
}