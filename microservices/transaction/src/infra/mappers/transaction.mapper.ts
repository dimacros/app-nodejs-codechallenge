import type { Transaction as PrismaTransaction, TransactionType as PrismaTransactionType } from "@yape/db/client";
import { TransactionAggregate } from "../../domain/transaction.domain";

export class TransactionMapper {
  static fromPrisma(transaction: PrismaTransaction & { transactionType: PrismaTransactionType }) {
    return TransactionAggregate.fromDto({
      transactionExternalId: transaction.transactionExternalId,
      accountExternalIdCredit: transaction.accountExternalIdCredit,
      accountExternalIdDebit: transaction.accountExternalIdDebit,
      transactionType: transaction.transactionType,
      transactionStatus: transaction.transactionStatus,
      value: transaction.value,
      createdAt: transaction.createdAt,
    })
  }
}