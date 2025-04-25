import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../app/services/prisma.service";
import { TransactionType } from "../../domain/transaction.domain";
import { TransactionTypeRepo } from "../../domain/transaction.repo";

@Injectable()
export class PrismaTransactionTypeRepo extends TransactionTypeRepo {
  constructor(
    private readonly prisma: PrismaService,
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