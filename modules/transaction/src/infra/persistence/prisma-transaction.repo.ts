import { Inject, Injectable } from "@nestjs/common";
import { TransactionRepo } from "../../domain/transaction.repo";
import { TransactionMapper } from "../mappers/transaction.mapper";
import { TransactionAggregate } from "../../domain/transaction.domain";
import { db } from "@yape-modules/core";

@Injectable()
export class PrismaTransactionRepo extends TransactionRepo {
  constructor(
    @Inject(db.PRISMA_CLIENT)
    private readonly prisma: db.prisma.PrismaClient,
  ) {
    super();
  }

  async getAll(): Promise<TransactionAggregate[]> {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        transactionType: true
      }
    });

    return transactions.map(tx => TransactionMapper.fromPrisma(tx));
  }

  async getOne(params: { transactionExternalId: string }): Promise<TransactionAggregate | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        transactionExternalId: params.transactionExternalId,
      },
      include: {
        transactionType: true
      }
    });

    return transaction ? TransactionMapper.fromPrisma(transaction) : null;
  }

  async save(transaction: TransactionAggregate): Promise<void> {
    const data = transaction.toPayload()

    await this.prisma.transaction.create({
      data: {
        transactionExternalId: data.transactionExternalId,
        accountExternalIdDebit: data.accountExternalIdDebit,
        accountExternalIdCredit: data.accountExternalIdCredit,
        transactionStatus: db.prisma.TransactionStatusEnum[data.transactionStatus],
        value: data.value,
        createdAt: data.createdAt,
        transactionTypeId: data.transactionType.id,
      }
    });
  }

  async update(transaction: TransactionAggregate): Promise<void> {
    const data = transaction.toPayload()

    await this.prisma.transaction.update({
      where: {
        transactionExternalId: data.transactionExternalId,
      },
      data: {
        transactionExternalId: data.transactionExternalId,
        accountExternalIdDebit: data.accountExternalIdDebit,
        accountExternalIdCredit: data.accountExternalIdCredit,
        transactionStatus: db.prisma.TransactionStatusEnum[data.transactionStatus],
        value: data.value,
        createdAt: data.createdAt,
        transactionTypeId: data.transactionType.id,
      }
    });
  }
}