import { Command } from "@nestjs/cqrs";
import type { CheckTransactionHandler } from "./check-transaction.handler";
import { TransactionPayload } from "../../domain/fraud.dto";

/**
 * Command to check a transaction for fraud detection.
 * {@link CheckTransactionHandler}
 */
export class CheckTransactionCommand extends Command<void> {
  constructor(
    readonly transactionPayload: TransactionPayload,
  ) {
    super();
  }

  static fromDto(dto: TransactionPayload) {
    return new CheckTransactionCommand(dto);
  }
}