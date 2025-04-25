import type { db } from "@yape-modules/core";
import { TransactionAggregate } from "../../domain/transaction.domain";

export class TransactionMapper {
  static fromPrisma(transaction: db.prisma.Transaction & { transactionType: db.prisma.TransactionType }) {
    return new TransactionAggregate({
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