import { TransactionStatus } from "./transaction-status.enum";

/**
 * Transaction DTO (Data Transfer Object)
 * This class represents the structure of a transaction object.
 */
export type TransactionPayload = {
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
