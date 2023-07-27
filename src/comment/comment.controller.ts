import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentDto, CreateCommentDto } from './dto/comment.dto';
import { CommentService } from './comment.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post()
    async create(@Body() comment: CreateCommentDto): Promise<CommentDto> {
        return this.commentService.create(comment);
    }

    @Post(':commentId/vote/up')
    @ApiParam({ name: 'commentId', type: String })
    async voteUp(@Param() commentId: string): Promise<CommentDto> {
        return this.commentService.voteUp(commentId);
    }

    @Post(':commentId/vote/down')
    @ApiParam({ name: 'commentId', type: String })
    async voteDown(@Param() commentId: string): Promise<CommentDto> {
        return this.commentService.voteDown(commentId);
    }
}
