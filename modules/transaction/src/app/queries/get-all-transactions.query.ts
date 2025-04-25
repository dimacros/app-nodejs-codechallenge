import { Query } from '@nestjs/cqrs';
import type { GetAllTransactionsHandler } from './get-all-transactions.handler';
import type { TransactionPayload } from '../../domain/transaction.dto';

/**
 * Query to get all transactions
 * {@link GetAllTransactionsHandler}
 */
export class GetAllTransactionsQuery extends Query<GetAllTransactionsResult> {}

export type GetTransactionItem = {
  readonly transactionExternalId: string;
  readonly transactionType: {
    readonly name: string;
  };
  readonly transactionStatus: {
    readonly name: string;
  };
  readonly value: number;
  readonly createdAt: string;
};

export type GetAllTransactionsResult = {
  readonly items: TransactionPayload[];
};
