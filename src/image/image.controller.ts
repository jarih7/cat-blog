import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('images')
export class ImageController {
  @UseGuards(AuthGuard)
  @Post()
  async upload() {}

  @UseGuards(AuthGuard)
  @Get(':imageId')
  async getOne(@Param('imageId', ParseUUIDPipe) id: string) {}

  @UseGuards(AuthGuard)
  @Delete(':imageId')
  async deleteOne(@Param('imageId', ParseUUIDPipe) id: string) {}
}
