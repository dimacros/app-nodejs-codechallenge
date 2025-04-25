import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTransactionStatusCommand } from './update-transaction-status.command';
import { TransactionRepo } from '../../domain/transaction.repo';
import { TransactionNotFound } from '../../contract';
import { TransactionStatus } from '../../domain/transaction-status.enum';

@CommandHandler(UpdateTransactionStatusCommand)
export class UpdateTransactionStatusHandler
  implements ICommandHandler<UpdateTransactionStatusCommand> {
  constructor(
    private readonly transactionRepo: TransactionRepo,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: UpdateTransactionStatusCommand): Promise<void> {
    const currentTransaction = await this.transactionRepo.getOne({
      transactionExternalId: command.transactionExternalId,
    });

    if (!currentTransaction) {
      throw new TransactionNotFound(command.transactionExternalId);
    }

    const transaction = this.publisher.mergeObjectContext(currentTransaction);

    await this.transactionRepo.save(
      transaction.update({
        transactionStatus: TransactionStatus[command.status],
      }),
    );

    transaction.updated();
  }
}
