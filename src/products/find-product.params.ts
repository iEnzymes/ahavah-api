import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class FindProductParams {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @MinLength(3)
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }: { value?: string }) => {
    if (!value) return undefined;

    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length);
  })
  tags?: string[];

  @IsOptional()
  @IsIn(['createdAt', 'name', 'label'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
