import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { toUserDto } from './mappers/user.mapper';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { GetQuery } from 'src/common/common.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<UserDto> {
    if (await this.usernameExists(user.username)) {
      throw new BadRequestException('User with this username already exists.');
    }

    let newUser = this.userRepository.create(user);
    newUser = await this.userRepository.save(newUser);
    return toUserDto(newUser);
  }

  async getAll(query: GetQuery): Promise<UserDto[]> {
    const users = await this.userRepository.find({
      take: query.limit ?? Number.MAX_SAFE_INTEGER,
      skip: query.offset ?? 0,
    });
    return users.map(toUserDto);
  }

  async getOne(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return toUserDto(user);
  }

  //------------------------------------------------------------

  private async usernameExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    return !!user;
  }
}
