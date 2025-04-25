export type TransactionPayload = {
  transactionExternalId: string;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  transactionType: {
    id: number;
    name: string;
  }
  transactionStatus: 'PENDING' | 'COMPLETED' | 'REJECTED';
  value: number;
  createdAt: Date;
}
