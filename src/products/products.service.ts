import { Injectable, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductStatus } from './products.model';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { WrongProductStatusException } from './exceptions/wrong-product-status.exception';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  public async findOne(id: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id });
  }

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productRepository.save(createProductDto);
  }

  public async updateProduct(
    product: Product,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  private isValidStatusTransition(
    currentStatus: ProductStatus,
    newStatus: ProductStatus,
  ): boolean {
    const statusOrder = [
      ProductStatus.OPEN,
      ProductStatus.IN_PROGRESS,
      ProductStatus.DONE,
    ];

    return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
  }

  public async deleteProduct(product: Product): Promise<void> {
    await this.productRepository.delete(product.id);
  }
}
