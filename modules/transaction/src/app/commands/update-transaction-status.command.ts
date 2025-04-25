import { Command } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { TransactionStatus } from "../../domain/transaction-status.enum";
import type { UpdateTransactionStatusHandler } from "./update-transaction-status.handler";

/**
 * Command to update a transaction status.
 * {@link UpdateTransactionStatusHandler}
 */
export class UpdateTransactionStatusCommand extends Command<void> {
  transactionExternalId: string;
  status: Extract<keyof typeof TransactionStatus, "REJECTED" | "APPROVED">;

  constructor() {
    super();
  }

  static fromDto(dto: {
    transactionExternalId: string;
    status: Extract<keyof typeof TransactionStatus, "REJECTED" | "APPROVED">;
  }): UpdateTransactionStatusCommand {
    return plainToInstance(UpdateTransactionStatusCommand, dto);
  }
}