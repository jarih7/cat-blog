import { Body, Controller, Ip, Param, Post } from '@nestjs/common';
import { CommentDto, CreateCommentDto } from './dto/comment.dto';
import { CommentService } from './comment.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() comment: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.create(comment);
  }

  @Post(':commentId/vote/up')
  @ApiParam({ name: 'commentId', type: String })
  async voteUp(
    @Param('commentId') commentId: string,
    @Ip() ip,
  ): Promise<CommentDto> {
    return this.commentService.voteUp(commentId, ip);
  }

  @Post(':commentId/vote/down')
  @ApiParam({ name: 'commentId', type: String })
  async voteDown(
    @Param('commentId') commentId: string,
    @Ip() ip,
  ): Promise<CommentDto> {
    return this.commentService.voteDown(commentId, ip);
  }
}
