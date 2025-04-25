import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTransactionQuery } from "./get-transaction.query";
import { TransactionRepo } from "../../domain/transaction.repo";
import { TransactionNotFound } from "../../domain/transaction.errors";

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler implements IQueryHandler<GetTransactionQuery> {
  constructor(
    private readonly transactionRepo: TransactionRepo,
  ) { }

  async execute(query: GetTransactionQuery) {
    const transaction = await this.transactionRepo.getOne({
      transactionExternalId: query.transactionExternalId,
    });

    if (!transaction) {
      throw new TransactionNotFound(query.transactionExternalId);
    }

    return transaction.toPayload()
  }
}