import { Module } from '@nestjs/common';
import { FraudService } from './fraud.service';

@Module({
  imports: [],
  providers: [
    FraudService,
  ],
  exports: [
    FraudService,
  ],
})
export class FraudModule { }
