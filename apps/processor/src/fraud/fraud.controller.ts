
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Contract } from '@yape-modules/transaction';

@Controller()
export class FraudController {
  @EventPattern('transaction.created')
  handleReviewRequested(
    @Payload() dto: Contract.TransactionDto,
  ) {

  }
}
