import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CheckTransactionCommand } from './check-transaction.command';
import { IncomingTransactionAggregate } from '../../domain/fraud.domain';

@CommandHandler(CheckTransactionCommand)
export class CheckTransactionHandler
  implements ICommandHandler<CheckTransactionCommand>
{
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: CheckTransactionCommand): Promise<void> {
    const IncomingTransaction = this.publisher.mergeClassContext(
      IncomingTransactionAggregate,
    );

    const incomingTransaction = new IncomingTransaction(
      command.transactionPayload,
    );

    incomingTransaction.evaluate();
    incomingTransaction.commit();
  }
}
