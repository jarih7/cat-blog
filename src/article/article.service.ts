import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetQuery } from '../common/common.dto';
import { mapUpdatedArticleFields, toArticleDetailDto, toArticleDto } from './mappers/article.mapper';
import { ArticleDetailDto, ArticleDto, CreateArticleDto } from './dto/article.dto';
import { ArticleContent } from './articleContent.entity';
import { Image } from '../image/image.entity';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(Image) private readonly imageRepository: Repository<Image>) { }

    async create(article: CreateArticleDto): Promise<ArticleDetailDto> {
        if (await this.articleWithTitleExists(article.title)) {
            throw new BadRequestException('Article with this title already exists.');
        }

        const newArticleContent = new ArticleContent();
        newArticleContent.content = article.content;

        let newArticle = new Article();
        newArticle.articleContent = newArticleContent;
        newArticle.comments = [];
        newArticle.createdAt = new Date();
        newArticle.image = await this.imageRepository.findOne({ where: { id: article.imageId } });
        newArticle.lastUpdatedAt = newArticle.createdAt;
        newArticle.perex = article.perex;
        newArticle.title = article.title;

        newArticle = await this.articleRepository.save(newArticle);
        return toArticleDetailDto(newArticle);
    }

    async getMany(query: GetQuery): Promise<ArticleDto[]> {
        const articles = await this.articleRepository.find({
            relations: { image: true, author: true },
            take: query.limit,
            skip: query.offset,
        });

        return articles.map(toArticleDto);
    }

    async getOne(id: string): Promise<ArticleDto> {
        const article = await this.findById(id, false);
        if (!article) {
            throw new NotFoundException('Article not found.');
        }
        return toArticleDto(article);
    }

    async update(id: string, articleToUpdate: ArticleDetailDto): Promise<Article> {
        const existingArticle = await this.findById(id, true);
        if (!existingArticle) {
            throw new NotFoundException('Article with provided id was not found.');
        }
        mapUpdatedArticleFields(existingArticle, articleToUpdate);
        existingArticle.image = await this.imageRepository.findOne({ where: { id: articleToUpdate.imageId } });

        return this.articleRepository.save(existingArticle);
    }

    async delete(id: string) {
        return this.articleRepository.delete(id);
    }

    //------------------------------------------------------------

    private async findById(id: string, withDetail: boolean): Promise<Article | null> {
        return this.articleRepository.findOne({ where: { id }, relations: { image: true, author: true, articleContent: withDetail, comments: withDetail } });
    }

    private async articleWithTitleExists(title: string): Promise<boolean> {
        const article = await this.articleRepository.findOne({ where: { title } });
        return !!article;
    }
}
