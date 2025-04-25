import { Command } from "@nestjs/cqrs";
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

  private constructor(payload: {
    accountExternalIdDebit: string;
    accountExternalIdCredit: string;
    tranferTypeId: number;
    value: number;
  }) {
    super();
    this.accountExternalIdDebit = payload.accountExternalIdDebit;
    this.accountExternalIdCredit = payload.accountExternalIdCredit;
    this.tranferTypeId = payload.tranferTypeId;
    this.value = payload.value;
  }
}