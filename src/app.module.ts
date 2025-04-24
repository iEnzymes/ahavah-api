import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { appConfigSchema } from './config/config.types';
import { typeOrmConfig } from './config/database.config';
import { TypedConfigService } from './config/typed-config.service';
import { Product } from './products/product.entity';
import { ScentsModule } from './scents/scents.module';
import { Collection } from './collections/collections.entity';
import { User } from './users/user.entity';
import { ProductTag } from './products/product-tags.entity';
import { authConfig } from './config/auth.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        ...configService.get('database'),
        entities: [Product, ProductTag, Collection, User],
      }),
    }),
    ConfigModule.forRoot({
      load: [typeOrmConfig, authConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    ProductsModule,
    ScentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: TypedConfigService,
      useExisting: ConfigService,
    },
  ],
})
export class AppModule {}
