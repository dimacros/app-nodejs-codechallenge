import { Query } from "@nestjs/cqrs";
import { TransactionDto } from "../../domain/transaction.dto";
import type { GetTransactionHandler } from "./get-transaction.handler";

/**
 * Query to get a transaction.
 * {@link GetTransactionHandler}
 */
export class GetTransactionQuery extends Query<GetTransactionResult> {
  readonly transactionExternalId: string;
}

export type GetTransactionResult = TransactionDto;