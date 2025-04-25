import { IEvent } from "@nestjs/cqrs";
import { TransactionAggregate } from "./transaction.domain";
import { TransactionDto } from "./transaction.dto";

export abstract class TransactionEvent implements IEvent {
  abstract toDto(): {
    eventType: 'TransactionCreated';
    payload: TransactionDto;
  } | {
    eventType: 'TransactionStatusUpdated';
    payload: TransactionDto;
  } | {
    eventType: string;
    payload: Record<string, unknown>;
  }
}

export class TransactionCreated extends TransactionEvent {
  constructor(
    readonly transaction: TransactionAggregate,
  ) {
    super();
  }

  toDto() {
    return {
      eventType: TransactionCreated.name,
      payload: this.transaction.toDto(),
    };
  }
}

export class TransactionStatusUpdated extends TransactionEvent {
  constructor(
    readonly transaction: TransactionAggregate,
  ) {
    super();
  }

  toDto() {
    return {
      eventType: TransactionStatusUpdated.name,
      payload: this.transaction.toDto(),
    };
  }
}