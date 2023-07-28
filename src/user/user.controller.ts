import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { GetQuery } from '../common/common.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.userService.create(user);
  }

  @Get()
  async getMany(@Query() query: GetQuery): Promise<UserDto[]> {
    return this.userService.getAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getOne(id);
  }
}
