import { Command } from "@nestjs/cqrs";
import { CreateTransactionPayload, CreateTransactionResult } from "src/transaction.contract";

export class CreateTransactionCommand extends Command<CreateTransactionResult> implements CreateTransactionPayload {
  private constructor(
    public readonly accountExternalIdDebit: string,
    public readonly accountExternalIdCredit: string,
    public readonly tranferTypeId: number,
    public readonly value: number
  ) {
    super();
  }

  static from(dto: CreateTransactionPayload): CreateTransactionCommand {
    return new CreateTransactionCommand(
      dto.accountExternalIdDebit,
      dto.accountExternalIdCredit,
      dto.tranferTypeId,
      dto.value
    );
  }
}

