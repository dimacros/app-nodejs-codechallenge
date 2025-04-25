import { AggregateRoot } from "@nestjs/cqrs";
import { TransactionPayload } from "./fraud.dto";
import { TransactionStateViolationError } from "./fraud.errors";
import { FraudFlagged, TransactionApproved, TransactionRejected } from "./fraud.event";

export enum FraudRules {
  HIGH_AMOUNT = 1000,
}

export class IncomingTransactionAggregate extends AggregateRoot {
  constructor(
    readonly payload: TransactionPayload
  ) {
    super();
  }

  evaluate() {
    if (this.payload.transactionStatus !== 'PENDING') {
      throw new TransactionStateViolationError(
        this.payload.transactionExternalId,
        this.payload.transactionStatus,
      );
    }

    if (this.payload.value <= 0) {
      throw new TransactionStateViolationError(
        this.payload.transactionExternalId,
        'INVALID_VALUE',
      );
    }

    if (!this.payload.accountExternalIdDebit || !this.payload.accountExternalIdCredit) {
      throw new TransactionStateViolationError(
        this.payload.transactionExternalId,
        'INVALID_ACCOUNT',
      );
    }

    if (this.payload.value > FraudRules.HIGH_AMOUNT) {
      this.apply(new TransactionRejected(this.payload))
      this.apply(new FraudFlagged({
        transaction: this.payload,
        severity: 'HIGH',
        reason: `Transaction amount exceeds the limit of ${FraudRules.HIGH_AMOUNT}`,
        createdAt: new Date(),
      }))
    } else {
      this.apply(new TransactionApproved(this.payload))
    }
  }
}