import { Module } from '@nestjs/common';
import { FraudModule } from '@yape-modules/fraud';
import { FraudProcessorController } from './fraud-processor.controller';
import { CoreModule } from '@yape-modules/core';

@Module({
  imports: [
    CoreModule,
    FraudModule,
  ],
  controllers: [FraudProcessorController],
  providers: [],
})
export class FraudProcessorModule { }
