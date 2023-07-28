import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class GetQuery {
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Number of items skipped during pagination',
    minimum: 0,
    default: 0,
  })
  offset: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Number of items returned',
    minimum: 0,
    default: 5,
  })
  limit: number;
}
