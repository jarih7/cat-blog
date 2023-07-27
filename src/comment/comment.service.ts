import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentDto, CreateCommentDto } from './dto/comment.dto';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
import { toCommentDto } from './mappers/comment.mapper';

enum CommentVote {
    Up = 1,
    Down = -1,
}

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    ) { }

    async create(comment: CreateCommentDto): Promise<CommentDto> {
        let newComment = new Comment();
        const author = await this.userRepository.findOne({ where: { id: comment.authorId } });
        if (!author) {
            throw new NotFoundException('User with provided username was not found.');
        }
        const article = await this.articleRepository.findOne({ where: { id: comment.articleId } });
        if (!article) {
            throw new NotFoundException('Could not find the article.');
        }

        newComment.author = author;
        newComment.article = article;
        newComment.content = comment.content;
        newComment.postedAt = new Date();
        newComment.score = 0;

        newComment = await this.commentRepository.save(newComment);
        return toCommentDto(newComment);
    }

    async voteUp(commentId: string) {
        return this.updateCommentScore(commentId, CommentVote.Up);
    }

    async voteDown(commentId: string) {
        return this.updateCommentScore(commentId, CommentVote.Down);
    }

    //----------------------------------------------------------------

    private async updateCommentScore(commentId: string, add: CommentVote) {
        let comment = await this.commentRepository.findOne({ where: { id: commentId } });
        if (!comment) {
            throw new NotFoundException('Comment was not found.');
        }

        comment.score += add;

        comment = await this.commentRepository.save(comment);
        return toCommentDto(comment);
    }
}
