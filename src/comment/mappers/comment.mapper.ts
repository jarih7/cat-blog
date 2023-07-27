import { Comment } from "../comment.entity";
import { CommentDto } from "../dto/comment.dto";

export const toCommentDto = (comment: Comment): CommentDto => {
    const dto = new CommentDto();
    dto.commentId = comment.id;
    dto.articleId = comment.article.id;
    dto.author = comment.author.username;
    dto.content = comment.content;
    dto.postedAt = comment.postedAt.toISOString();
    dto.score = comment.score;
    return dto;
};
