import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { FindOneParams } from './find-one.params';
import { UpdateProductDto } from './update-product.dto';
import { WrongProductStatusException } from './exceptions/wrong-product-status.exception';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('/:id')
  public async findOne(@Param() params: FindOneParams): Promise<Product> {
    return await this.findOneOrFail(params.id);
  }

  @Post()
  public async create(
    @Body() createProductdto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductdto);
  }

  @Patch('/:id')
  public async updateProduct(
    @Param() params: FindOneParams,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOneOrFail(params.id);

    try {
      return await this.productsService.updateProduct(
        product,
        updateProductDto,
      );
    } catch (error) {
      if (error instanceof WrongProductStatusException) {
        throw new BadRequestException([error.message]);
      }
      console.log('this error');
      throw error;
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteProduct(@Param() params: FindOneParams): Promise<void> {
    const product = await this.findOneOrFail(params.id);
    await this.productsService.deleteProduct(product);
  }

  private async findOneOrFail(id: string): Promise<Product> {
    const product = await this.productsService.findOne(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
