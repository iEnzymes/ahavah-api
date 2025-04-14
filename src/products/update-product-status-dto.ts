import { IsEnum, IsNotEmpty } from 'class-validator';

import { ProductStatus } from './products.model';

export class UpdateProductStatusDto {
  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
