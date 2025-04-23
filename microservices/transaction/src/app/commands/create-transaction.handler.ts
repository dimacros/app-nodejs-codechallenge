import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTransactionCommand } from "./create-transaction.command";
import { CreateTransactionResult } from "src/transaction.contract";

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler implements ICommandHandler<CreateTransactionCommand> {
  async execute(command: CreateTransactionCommand) {
    return <CreateTransactionResult>{}
  }
}