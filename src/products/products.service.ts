import { Injectable, Post } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductStatus } from './products.model';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { WrongProductStatusException } from './exceptions/wrong-product-status.exception';
import { Product } from './product.entity';
import { CreateProductTagDto } from './create-product-tag.dto';
import { ProductTag } from './product-tags.entity';
import { FindProductParams } from './find-product.params';
import { PaginationParams } from '../common/paginaiton.params';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductTag)
    private readonly tagsRepository: Repository<ProductTag>,
  ) {}

  public async findAll(
    filters: FindProductParams,
    pagination: PaginationParams,
  ): Promise<[Product[], number]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.tags', 'tags');

    if (filters.name) {
      query.andWhere('product.name = :name', { name: filters.name });
    }

    if (filters.search?.trim()) {
      query.andWhere(
        '(product.label ILIKE :search OR product.description ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    query.skip(pagination.offset).take(pagination.limit);

    return query.getManyAndCount();
  }

  public async findOne(id: string): Promise<Product | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
  }

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    if (createProductDto.tags) {
      createProductDto.tags = this.getUniqueTags(createProductDto.tags);
    }
    return await this.productRepository.save(createProductDto);
  }

  public async updateProduct(
    product: Product,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (updateProductDto.tags) {
      updateProductDto.tags = this.getUniqueTags(updateProductDto.tags);
    }

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  public async addTags(
    product: Product,
    tagDtos: CreateProductTagDto[],
  ): Promise<Product> {
    const names = new Set(product.tags.map((label) => label.name));
    const tags = this.getUniqueTags(tagDtos)
      .filter((dto) => !names.has(dto.name))
      .map((tag) => this.tagsRepository.create(tag));

    if (tags.length) {
      product.tags = [...product.tags, ...tags];
      return await this.productRepository.save(product);
    }

    return product;
  }

  public async removeTags(
    product: Product,
    tagsToRemove: string[],
  ): Promise<Product> {
    product.tags = product.tags.filter(
      (tag) => !tagsToRemove.includes(tag.name),
    );

    return await this.productRepository.save(product);
  }

  public async deleteProduct(product: Product): Promise<void> {
    await this.productRepository.remove(product);
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

  private getUniqueTags(tagDtos: CreateProductTagDto[]): CreateProductTagDto[] {
    const uniqueNames = [...new Set(tagDtos.map((tag) => tag.name))];

    return uniqueNames.map((name) => ({ name }));
  }
}
