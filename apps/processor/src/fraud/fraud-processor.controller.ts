
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Contract, FraudService } from '@yape-modules/fraud';

@Controller()
export class FraudProcessorController {
  constructor(
    private readonly fraudService: FraudService,
  ) { }

  @EventPattern('transaction.created')
  handleReviewRequested(
    @Payload() dto: Contract.TransactionPayload,
  ) {
    return this.fraudService.checkTransaction(
      Contract.CheckTransactionCommand.fromDto(dto)
    )
  }
}
