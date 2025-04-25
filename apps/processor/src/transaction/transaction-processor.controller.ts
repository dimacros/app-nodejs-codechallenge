
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Contract } from '@yape-modules/transaction';
import { TransactionService } from '@yape-modules/transaction';

@Controller()
export class TransactionProcessorController {
  constructor(
    private readonly transactionService: TransactionService,
  ) { }

  @EventPattern('transaction.rejected')
  handleTransactionRejected(
    @Payload() dto: Contract.TransactionPayload,
  ) {
    return this.transactionService.updateTransactionStatus(
      Contract.UpdateTransactionStatusCommand.fromDto({
        transactionExternalId: dto.transactionExternalId,
        status: 'REJECTED',
      })
    )
  }

  @EventPattern('transaction.approved')
  handleTransactionApproved(
    @Payload() dto: Contract.TransactionPayload,
  ) {
    return this.transactionService.updateTransactionStatus(
      Contract.UpdateTransactionStatusCommand.fromDto({
        transactionExternalId: dto.transactionExternalId,
        status: 'APPROVED',
      })
    )
  }


}
