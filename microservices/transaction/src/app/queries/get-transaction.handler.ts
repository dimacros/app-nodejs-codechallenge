import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTransactionQuery } from "./get-transaction.query";

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler implements IQueryHandler<GetTransactionQuery> {
  async execute(query: GetTransactionQuery): Promise<void> {
    // Logic to handle the query and return a specific transaction
    // This is just a placeholder implementation
    console.log("Handling GetTransactionQuery");
  }
}