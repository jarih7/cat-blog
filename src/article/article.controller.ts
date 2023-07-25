import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetQuery } from '../common/common.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ArticleDetailDto } from './article.dto';

@Controller('articles')
export class ArticleController {
  @UseGuards(AuthGuard)
  @Get()
  async getMany(@Query() query: GetQuery) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() articleDetail: ArticleDetailDto) {}

  @UseGuards(AuthGuard)
  @Get(':articleId')
  async getOne(@Param('articleId', ParseUUIDPipe) id: string) {}

  @UseGuards(AuthGuard)
  @Patch(':articleId')
  async update(
    @Param('articleId', ParseUUIDPipe) id: string,
    @Body() articleDetail: ArticleDetailDto,
  ) {}

  @UseGuards(AuthGuard)
  @Delete(':articleId')
  async delete(@Param('articleId', ParseUUIDPipe) id: string) {}
}
