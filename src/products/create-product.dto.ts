import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
  @IsUUID()
  collectionId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
