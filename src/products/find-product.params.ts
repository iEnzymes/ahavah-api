import { IsOptional, IsString, MinLength } from 'class-validator';

export class FindProductParams {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @MinLength(3)
  @IsString()
  search?: string;
}
