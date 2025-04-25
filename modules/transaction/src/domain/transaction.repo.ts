import { TransactionAggregate, TransactionType } from "./transaction.domain";
import type { PrismaTransactionRepo } from "../infra/persistence/prisma-transaction.repo";

/**
 * Repository interface for transactions.
 * {@link PrismaTransactionRepo}
 */
export abstract class TransactionRepo {
  abstract getAll(): Promise<TransactionAggregate[]>;
  abstract getOne(params: { transactionExternalId: string }): Promise<TransactionAggregate | null>;
  abstract save(transaction: TransactionAggregate): Promise<void>;
  abstract update(transaction: TransactionAggregate): Promise<void>;
}

export abstract class TransactionTypeRepo {
  abstract getById(id: number): Promise<TransactionType | null>;
}