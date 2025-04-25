import { IEvent } from "@nestjs/cqrs";
import { TransactionAggregate } from "./transaction.domain";
import { TransactionPayload } from "./transaction.dto";

export abstract class TransactionEvent implements IEvent {
  abstract plain(): {
    eventType: 'TransactionCreated';
    payload: TransactionPayload;
  } | {
    eventType: 'TransactionStatusUpdated';
    payload: TransactionPayload;
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

  plain() {
    return {
      eventType: TransactionCreated.name,
      payload: this.transaction.toPayload(),
    };
  }
}

export class TransactionUpdated extends TransactionEvent {
  constructor(
    readonly transaction: TransactionAggregate,
  ) {
    super();
  }

  plain() {
    return {
      eventType: TransactionCreated.name,
      payload: this.transaction.toPayload(),
    };
  }
}

export class TransactionStatusUpdated extends TransactionEvent {
  constructor(
    readonly transaction: TransactionAggregate,
  ) {
    super();
  }

  plain() {
    return {
      eventType: TransactionStatusUpdated.name,
      payload: this.transaction.toPayload(),
    };
  }
}