export type CreateTransactionPayload = {
  readonly accountExternalIdDebit: string;
  readonly accountExternalIdCredit: string;
  readonly tranferTypeId: number;
  readonly value: number;
}

export type CreateTransactionResult = {
  readonly transactionExternalId: string;
  readonly transactionType: {
    readonly name: string;
  }
  readonly transactionStatus: {
    readonly name: string;
  }
  readonly value: number;
  readonly createdAt: string;
}
