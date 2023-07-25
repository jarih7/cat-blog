import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { ImageModule } from './image/image.module';

const entities = [UserEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities,
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    ArticleModule,
    CommentModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
