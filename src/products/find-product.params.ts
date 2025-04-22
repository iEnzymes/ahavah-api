import { IsOptional, IsString } from 'class-validator';

export class FindProductParams {
  @IsOptional()
  @IsString()
  name?: string;
}
