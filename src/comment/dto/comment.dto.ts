export class CreateCommentDto {
    articleId: string;
    authorId: string;
    content: string;
}

export class CommentDto {
    commentId: string;
    articleId: string;
    author: string;
    content: string;
    postedAt: string;
    score: number;
}