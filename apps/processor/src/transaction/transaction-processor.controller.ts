
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Contract } from '@yape-modules/transaction';
import { TransactionService } from '@yape-modules/transaction';
import { map, throwError } from 'rxjs';

@Controller()
export class TransactionProcessorController {
  constructor(
    private readonly transactionService: TransactionService,
  ) { }

  @MessagePattern('create.transaction')
  handleCreateTransaction(
    @Payload() dto: Contract.CreateTransactionCommand,
  ) {
    return this.transactionService.createTransaction(
      Contract.CreateTransactionCommand.fromDto(dto),
    ).pipe(
      map(() => throwError(() => new Error('Transaction not found'))),
    )
  }

  @MessagePattern('get.transaction')
  handleGetTransaction(
    @Payload() dto: Contract.GetTransactionQuery,
  ) {
    return this.transactionService.getTransaction(
      Contract.GetTransactionQuery.fromDto(dto),
    ).pipe(
      map(() => throwError(() => new Error('Transaction not found'))),
    )
  }

  @MessagePattern('get.all.transactions')
  handleGetAllTransactions(
    @Payload() dto: Contract.GetAllTransactionsQuery,
  ) {
    return this.transactionService.getAllTransactions(
      new Contract.GetAllTransactionsQuery()
    )
  }

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
