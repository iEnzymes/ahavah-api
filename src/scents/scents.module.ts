import { Module } from '@nestjs/common';
import { ScentsController } from './scents.controller';
import { ScentsService } from './scents.service';

@Module({
  controllers: [ScentsController],
  providers: [ScentsService]
})
export class ScentsModule {}
