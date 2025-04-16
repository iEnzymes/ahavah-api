import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductTag } from './product-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTag])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
