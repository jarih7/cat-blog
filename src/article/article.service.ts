import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetQuery } from '../common/common.dto';
import {
  mapUpdatedArticleFields,
  toArticleDetailDto,
  toArticleDto,
} from './mappers/article.mapper';
import {
  ArticleDetailDto,
  ArticleDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto/article.dto';
import { ArticleContent } from './articleContent.entity';
import { Image } from '../image/image.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(article: CreateArticleDto): Promise<ArticleDetailDto> {
    if (await this.articleWithTitleExists(article.title)) {
      throw new BadRequestException('Article with this title already exists.');
    }

    const author = await this.getAuthor(article.authorId);
    if (!author) {
      throw new BadRequestException('Author not found.');
    }

    const newArticleContent = new ArticleContent();
    newArticleContent.content = article.content;

    let newArticle = new Article();
    newArticle.author = author;
    newArticle.articleContent = newArticleContent;
    newArticle.comments = [];
    newArticle.createdAt = new Date();
    newArticle.image = await this.imageRepository.findOne({
      where: { id: article.imageId },
    });
    newArticle.lastUpdatedAt = newArticle.createdAt;
    newArticle.perex = article.perex;
    newArticle.title = article.title;

    newArticle = await this.articleRepository.save(newArticle);
    return toArticleDetailDto(newArticle);
  }

  async getMany(query: GetQuery): Promise<ArticleDto[]> {
    const articles = await this.articleRepository.find({
      relations: { image: true, author: true },
      take: query.limit ?? Number.MAX_SAFE_INTEGER,
      skip: query.offset ?? 0,
    });

    return articles.map(toArticleDto);
  }

  async getOne(id: string): Promise<ArticleDetailDto> {
    const article = await this.findByIdWithDetail(id);
    if (!article) {
      throw new NotFoundException('Article not found.');
    }
    return toArticleDetailDto(article);
  }

  async update(
    id: string,
    articleToUpdate: UpdateArticleDto,
  ): Promise<ArticleDetailDto> {
    const existingArticle = await this.findByIdWithDetail(id);
    if (!existingArticle) {
      throw new NotFoundException('Article with provided id was not found.');
    }
    mapUpdatedArticleFields(existingArticle, articleToUpdate);
    existingArticle.image = await this.imageRepository.findOne({
      where: { id: articleToUpdate.imageId },
    });

    const updatedArticle = await this.articleRepository.save(existingArticle);
    return toArticleDetailDto(updatedArticle);
  }

  async delete(id: string) {
    return this.articleRepository.delete(id);
  }

  //------------------------------------------------------------

  private async findByIdWithDetail(id: string): Promise<Article | null> {
    return this.articleRepository.findOne({
      where: { id },
      //relations: {
      //  image: true,
      //  author: true,
      //  articleContent: true,
      //  comments: true,
      //},
      relations: [
        'image',
        'author',
        'articleContent',
        'comments',
        'comments.author',
        'comments.article',
      ],
    });
  }

  private async articleWithTitleExists(title: string): Promise<boolean> {
    const article = await this.articleRepository.findOne({ where: { title } });
    return !!article;
  }

  private async getAuthor(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
