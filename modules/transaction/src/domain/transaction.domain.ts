import { TransactionDto } from "./transaction.dto";

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

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

export class TransactionAggregate {
  private transactionExternalId: string;
  private accountExternalIdDebit: string;
  private accountExternalIdCredit: string;
  private transactionType: TransactionType;
  private transactionStatus: TransactionStatus;
  private value: number;
  private createdAt: Date;

  private constructor(dto: {
    transactionExternalId: string;
    accountExternalIdDebit: string;
    accountExternalIdCredit: string;
    transactionType: TransactionType;
    transactionStatus: TransactionStatus;
    value: number;
    createdAt: Date;
  }) {
    this.transactionExternalId = dto.transactionExternalId;
    this.transactionType = dto.transactionType;
    this.transactionStatus = dto.transactionStatus;
    this.value = dto.value;
    this.createdAt = dto.createdAt;
  }

  static fromDto(dto: TransactionDto): TransactionAggregate {
    return new TransactionAggregate({
      transactionExternalId: dto.transactionExternalId,
      accountExternalIdDebit: dto.accountExternalIdDebit,
      accountExternalIdCredit: dto.accountExternalIdCredit,
      transactionType: TransactionType.fromDto(dto.transactionType),
      transactionStatus: TransactionStatus[dto.transactionStatus],
      value: dto.value,
      createdAt: new Date(dto.createdAt),
    });
  }

  toDto(): TransactionDto {
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