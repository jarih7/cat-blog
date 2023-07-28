import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetQuery } from '../common/common.dto';
import { ArticleService } from './article.service';
import {
  ArticleDetailDto,
  ArticleDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto/article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() article: CreateArticleDto): Promise<ArticleDetailDto> {
    return this.articleService.create(article);
  }

  @Get()
  async getMany(@Query() query: GetQuery): Promise<ArticleDto[]> {
    return this.articleService.getMany(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ArticleDetailDto> {
    return this.articleService.getOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() article: UpdateArticleDto,
  ): Promise<ArticleDetailDto> {
    return this.articleService.update(id, article);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
