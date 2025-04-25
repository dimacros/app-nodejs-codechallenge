import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './app/commands/create-transaction.command';
import { GetAllTransactionsQuery, GetTransactionQuery } from './contract';

@Injectable()
export class TransactionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  createTransaction(command: CreateTransactionCommand) {
    return this.commandBus.execute(command);
  }

  getAllTransactions(query: GetAllTransactionsQuery) {
    return this.queryBus.execute(query);
  }

  getTransactionById(query: GetTransactionQuery) {
    return this.queryBus.execute(query);
  }
}
