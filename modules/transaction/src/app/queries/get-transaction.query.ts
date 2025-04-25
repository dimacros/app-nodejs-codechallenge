import { Query } from '@nestjs/cqrs';
import type { TransactionPayload } from '../../domain/transaction.dto';
import type { GetTransactionHandler } from './get-transaction.handler';
import { plainToInstance } from 'class-transformer';

/**
 * Query to get a transaction.
 * {@link GetTransactionHandler}
 */
export class GetTransactionQuery extends Query<GetTransactionResult> {
  readonly transactionExternalId: string;

  static fromDto(dto: GetTransactionQuery): GetTransactionQuery {
    return plainToInstance(GetTransactionQuery, dto);
  }
}

export type GetTransactionResult = TransactionPayload;
