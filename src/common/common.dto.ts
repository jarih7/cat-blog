import { IsEmpty, IsNumber, Min } from 'class-validator';

export class GetQuery {
  @IsEmpty()
  @IsNumber()
  @Min(0)
  offset: number;

  @IsEmpty()
  @IsNumber()
  @Min(0)
  limit: number;
}
