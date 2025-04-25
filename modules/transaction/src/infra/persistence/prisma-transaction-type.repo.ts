import { Inject, Injectable } from "@nestjs/common";
import { db } from "@yape-modules/core";
import { TransactionType } from "../../domain/transaction.domain";
import { TransactionTypeRepo } from "../../domain/transaction.repo";

@Injectable()
export class PrismaTransactionTypeRepo extends TransactionTypeRepo {
  constructor(
    @Inject(db.PRISMA_CLIENT)
    private readonly prisma: db.prisma.PrismaClient,
  ) {
    super();
  }

  async getById(id: number): Promise<TransactionType | null> {
    const transactionType = await this.prisma.transactionType.findUnique({
      where: {
        id,
      },
    });

    return transactionType ? TransactionType.fromDto(transactionType) : null;
  }
}