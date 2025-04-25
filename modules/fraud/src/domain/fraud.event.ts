import { TransactionPayload } from "./fraud.dto";

export class FraudFlagged {
  readonly transactionId: string;
  readonly severity: string;
  readonly reason: string;
  readonly createdAt: Date;

  constructor(readonly payload: {
    transaction: TransactionPayload;
    severity: string;
    reason: string;
    createdAt: Date;
  }) {
    this.transactionId = payload.transaction.transactionExternalId;
    this.severity = payload.severity;
    this.reason = payload.reason;
    this.createdAt = payload.createdAt;
  }
}

export class TransactionRejected {
  constructor(
    readonly transaction: TransactionPayload
  ) { }
}

export class TransactionApproved {
  constructor(
    readonly transaction: TransactionPayload
  ) { }
}