import { AggregateRoot } from "@nestjs/cqrs";
import { TransactionPayload } from "./transaction.dto";
import { TransactionCreated, TransactionStatusUpdated, TransactionUpdated } from "./transaction.event";
import { TransactionStatus } from "./transaction-status.enum";

export class TransactionType {
  readonly id: number;
  readonly name: string;

  private constructor(attributes: { id: number; name: string }) {
    this.id = attributes.id;
    this.name = attributes.name;
  }

  static fromDto(dto: { id: number; name: string }): TransactionType {
    return new TransactionType({
      id: dto.id,
      name: dto.name,
    });
  }
}

export class TransactionAggregate extends AggregateRoot {
  private transactionExternalId: string;
  private accountExternalIdDebit: string;
  private accountExternalIdCredit: string;
  private transactionType: TransactionType;
  private transactionStatus: TransactionStatus;
  private value: number;
  private createdAt: Date;

  constructor(dto: TransactionPayload) {
    super();
    this.transactionExternalId = dto.transactionExternalId;
    this.accountExternalIdDebit = dto.accountExternalIdDebit;
    this.accountExternalIdCredit = dto.accountExternalIdCredit;
    this.transactionType = TransactionType.fromDto(dto.transactionType);
    this.transactionStatus = TransactionStatus[dto.transactionStatus];
    this.value = dto.value;
    this.createdAt = dto.createdAt;
  }

  saved(): TransactionAggregate {
    this.apply(new TransactionCreated(this))
    this.commit();

    return this;
  }

  updated(): TransactionAggregate {
    this.apply(new TransactionUpdated(this))
    this.commit();

    return this;
  }

  update(dto: Partial<TransactionPayload>): TransactionAggregate {
    this.transactionExternalId = dto.transactionExternalId ?? this.transactionExternalId;
    this.accountExternalIdDebit = dto.accountExternalIdDebit ?? this.accountExternalIdDebit;
    this.accountExternalIdCredit = dto.accountExternalIdCredit ?? this.accountExternalIdCredit;
    this.transactionType = dto.transactionType
      ? TransactionType.fromDto(dto.transactionType)
      : this.transactionType;
    this.value = dto.value ?? this.value;

    if (dto.transactionStatus && dto.transactionStatus !== this.transactionStatus) {
      this.transactionStatus = TransactionStatus[dto.transactionStatus];
      this.apply(new TransactionStatusUpdated(this));
      this.commit();
    }

    return this;
  }

  toPayload(): TransactionPayload {
    return {
      transactionExternalId: this.transactionExternalId,
      accountExternalIdDebit: this.accountExternalIdDebit,
      accountExternalIdCredit: this.accountExternalIdCredit,
      transactionType: {
        id: this.transactionType.id,
        name: this.transactionType.name,
      },
      transactionStatus: this.transactionStatus,
      value: this.value,
      createdAt: this.createdAt,
    };
  }
}