import { ApiProperty } from "@nestjs/swagger";

export class GetQuery {
  @ApiProperty({
    description: 'Number of items skipped during pagination',
    minimum: 0,
    default: 0,
  })
  offset: number;

  @ApiProperty({
    description: 'Number of items returned',
    minimum: 0,
    default: 5,
  })
  limit: number;
}
