import { IsNotEmpty, IsString, IsUUID } from "class-validator";

class UserBaseDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class UserDto extends UserBaseDto {
  @IsUUID()
  userId: string;
}

export class CreateUserDto extends UserBaseDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
