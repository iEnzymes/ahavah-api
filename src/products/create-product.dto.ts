import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { ProductStatus } from './products.model';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  price: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
