import { TransactionStatus } from "@yape/db/client";

/**
 * Transaction DTO (Data Transfer Object)
 * This class represents the structure of a transaction object.
 */
export type TransactionDto = {
  transactionExternalId: string;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  transactionType: {
    id: number;
    name: string;
  }
  transactionStatus: keyof typeof TransactionStatus;
  value: number;
  createdAt: Date;
}
