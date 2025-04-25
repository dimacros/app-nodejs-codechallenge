import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetAllTransactionsQuery,
  GetAllTransactionsResult,
} from './get-all-transactions.query';
import { TransactionRepo } from '../../domain/transaction.repo';

@QueryHandler(GetAllTransactionsQuery)
export class GetAllTransactionsHandler
  implements IQueryHandler<GetAllTransactionsQuery>
{
  constructor(private readonly transactionRepo: TransactionRepo) {}

  async execute(_: GetAllTransactionsQuery) {
    const transactions = await this.transactionRepo.getAll();

    return <GetAllTransactionsResult>{
      items: transactions.map((x) => x.toPayload()),
    };
  }
}
