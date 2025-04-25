import { TransactionAggregate } from "./transaction.domain";

export class TransactionCreated {
  constructor(
    readonly transaction: TransactionAggregate,
  ) { }
}