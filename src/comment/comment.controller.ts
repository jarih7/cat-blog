import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CommentDto } from './comment.dto';

@Controller('comments')
export class CommentController {
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() comment: CommentDto) {}

  @UseGuards(AuthGuard)
  @Post(':commentId/vote/up')
  async voteUp(@Param('commentId', ParseUUIDPipe) id: string) {}

  @UseGuards(AuthGuard)
  @Post(':commentId/vote/down')
  async voteDown(@Param('commentId', ParseUUIDPipe) id: string) {}
}
