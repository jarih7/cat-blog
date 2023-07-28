import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentDto, CreateCommentDto } from './dto/comment.dto';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
import { toCommentDto } from './mappers/comment.mapper';
import { Vote } from '../vote/vote.entity';

enum CommentVote {
  Up = 1,
  Down = -1,
}

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Vote) private readonly voteRepository: Repository<Vote>,
  ) {}

  async create(comment: CreateCommentDto): Promise<CommentDto> {
    let newComment = new Comment();
    const author = await this.userRepository.findOne({
      where: { id: comment.authorId },
    });
    if (!author) {
      throw new NotFoundException('User with provided username was not found.');
    }
    const article = await this.articleRepository.findOne({
      where: { id: comment.articleId },
    });
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

  async voteUp(commentId: string, ip: string) {
    const alreadyVoted = await this.anotherVoteExistsForThisCommentFromThisIp(
      commentId,
      ip,
    );
    if (alreadyVoted) {
      throw new BadRequestException(
        'It is only allowed to vote once on a comment',
      );
    }

    const [comment, commentDto] = await this.updateCommentScore(
      commentId,
      ip,
      CommentVote.Up,
    );
    await this.createNewVote(comment, ip);

    return commentDto;
  }

  async voteDown(commentId: string, ip: string) {
    const alreadyVoted = await this.anotherVoteExistsForThisCommentFromThisIp(
      commentId,
      ip,
    );
    if (alreadyVoted) {
      throw new BadRequestException(
        'It is only allowed to vote once on a comment',
      );
    }

    const [comment, commentDto] = await this.updateCommentScore(
      commentId,
      ip,
      CommentVote.Down,
    );
    await this.createNewVote(comment, ip);

    return commentDto;
  }

  //----------------------------------------------------------------

  private async createNewVote(comment: Comment, ip: string) {
    const vote = new Vote();
    vote.comment = comment;
    vote.vote = CommentVote.Up;
    vote.ip = ip;

    await this.voteRepository.save(vote);
  }

  private async anotherVoteExistsForThisCommentFromThisIp(
    commentId: string,
    ip: string,
  ): Promise<boolean> {
    const vote = await this.voteRepository.findOne({
      where: { ip, comment: { id: commentId } },
    });
    return !!vote;
  }

  private async updateCommentScore(
    commentId: string,
    ip: string,
    add: CommentVote,
  ): Promise<[Comment, CommentDto]> {
    let comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['article', 'author', 'votes'],
    });
    if (!comment) {
      throw new NotFoundException('Comment was not found.');
    }

    comment.score += add;

    comment = await this.commentRepository.save(comment);
    return [comment, toCommentDto(comment)];
  }
}
