import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import {
  ArticleDetailDto,
  ArticleDto,
  CreateArticleDto,
} from './dto/article.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Image } from '../image/image.entity';
import { GetQuery } from '../common/common.dto';
import { User } from '../user/user.entity';
import { DeleteResult } from 'typeorm';

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Image),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
    articleController = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(articleController).toBeDefined();
  });

  describe('create article', () => {
    it('create article', async () => {
      const body = {
        authorId: 'authoruuid',
        content: 'abc',
        title: 'title',
        perex: 'eeem',
        imageId: 'imageuuid',
      } as CreateArticleDto;
      const expectedResult = new ArticleDetailDto();

      jest.spyOn(articleService, 'create').mockResolvedValue(expectedResult);
      expect(await articleController.create(body)).toBe(expectedResult);
      expect(articleService.create).toHaveBeenCalled();
    });
  });

  describe('get article', () => {
    it('get one', async () => {
      const articleId = 'abcd123';
      const expectedResult = new ArticleDetailDto();

      jest.spyOn(articleService, 'getOne').mockResolvedValue(expectedResult);
      expect(await articleController.getOne(articleId)).toBe(expectedResult);
      expect(articleService.getOne).toHaveBeenCalled();
    });

    it('get many', async () => {
      const query = { offset: 0, limit: 5 } as GetQuery;
      const expectedResult = [new ArticleDto(), new ArticleDto()];

      jest.spyOn(articleService, 'getMany').mockResolvedValue(expectedResult);
      expect(await articleController.getMany(query)).toBe(expectedResult);
      expect(articleService.getMany).toHaveBeenCalled();
      expect(articleService.getOne).not.toHaveBeenCalled();
    });
  });

  describe('update article', () => {
    it('update one', async () => {
      const articleId = 'abcd123';
      const expectedResult = new ArticleDetailDto();

      jest.spyOn(articleService, 'update').mockResolvedValue(expectedResult);
      expect(await articleController.update(articleId, expectedResult)).toBe(
        expectedResult,
      );
      expect(articleService.update).toHaveBeenCalled();
    });
  });

  describe('delete article', () => {
    it('delete one', async () => {
      const articleId = 'abcd123';
      const expectedResult = new DeleteResult();

      jest.spyOn(articleService, 'delete').mockResolvedValue(expectedResult);
      expect(await articleController.delete(articleId)).toBe(expectedResult);
      expect(articleService.delete).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
