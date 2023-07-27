import { UserDto } from "../dto/user.dto";
import { User } from "../user.entity";

export const toUserDto = (user: User): UserDto => {
    const dto = new UserDto();
    dto.userId = user.id;
    dto.username = user.username;
    return dto;
};
