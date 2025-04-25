import { Command } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import type { CreateTransactionHandler } from "./create-transaction.handler";

/**
 * Command to create a transaction.
 * {@link CreateTransactionHandler}
 */
export class CreateTransactionCommand extends Command<void> {
  readonly accountExternalIdDebit: string
  readonly accountExternalIdCredit: string
  readonly tranferTypeId: number
  readonly value: number

  constructor() {
    super();
  }

  static fromDto(dto: {
    accountExternalIdDebit: string;
    accountExternalIdCredit: string;
    tranferTypeId: number;
    value: number;
  }) {
    return plainToInstance(CreateTransactionCommand, dto);
  }
}