import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './app/commands/create-transaction.command';
import { GetAllTransactionsQuery, GetTransactionQuery } from './contract';
import { UpdateTransactionStatusCommand } from './app/commands/update-transaction-status.command';
import { defer } from 'rxjs';

@Injectable()
export class TransactionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  createTransaction(command: CreateTransactionCommand) {
    return defer(() => this.commandBus.execute(command));
  }

  getAllTransactions(query: GetAllTransactionsQuery) {
    return defer(() => this.queryBus.execute(query));
  }

  getTransactionById(query: GetTransactionQuery) {
    return defer(() => this.queryBus.execute(query));
  }

  updateTransactionStatus(command: UpdateTransactionStatusCommand) {
    return defer(() => this.commandBus.execute(command));
  }
}
