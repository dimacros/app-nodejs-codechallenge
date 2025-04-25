import { randomUUID } from 'node:crypto';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './create-transaction.command';
import {
  TransactionRepo,
  TransactionTypeRepo,
} from '../../domain/transaction.repo';
import { TransactionAggregate } from '../../domain/transaction.domain';
import { TransactionTypeNotFound } from '../../domain/transaction.errors';
import { TransactionStatus } from '../../domain/transaction-status.enum';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(
    private readonly transactionRepo: TransactionRepo,
    private readonly transactionTypeRepo: TransactionTypeRepo,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateTransactionCommand) {
    const Transaction = this.publisher.mergeClassContext(TransactionAggregate);

    const transactionType = await this.transactionTypeRepo.getById(
      command.tranferTypeId,
    );

    if (!transactionType) {
      throw new TransactionTypeNotFound(command.tranferTypeId);
    }

    const transaction = new Transaction({
      transactionExternalId: randomUUID(),
      accountExternalIdDebit: command.accountExternalIdDebit,
      accountExternalIdCredit: command.accountExternalIdCredit,
      transactionType: transactionType,
      transactionStatus: TransactionStatus.PENDING,
      value: command.value,
      createdAt: new Date(),
    });

    await this.transactionRepo.save(transaction);

    transaction.saved();
  }
}
