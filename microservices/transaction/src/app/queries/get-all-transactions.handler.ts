import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllTransactionsQuery } from "./get-all-transactions.query";

@QueryHandler(GetAllTransactionsQuery)
export class GetAllTransactionsHandler implements IQueryHandler<GetAllTransactionsQuery> {
  async execute(query: GetAllTransactionsQuery): Promise<void> {
    // Logic to handle the query and return all transactions
    // This is just a placeholder implementation
    console.log("Handling GetAllTransactionsQuery");
  }
}