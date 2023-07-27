export class CreateUserDto {
    username: string;
}

export class UserDto extends CreateUserDto {
    userId: string;
}
