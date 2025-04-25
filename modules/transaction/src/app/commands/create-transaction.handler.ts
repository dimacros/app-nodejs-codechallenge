import { randomUUID } from "node:crypto";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateTransactionCommand } from "./create-transaction.command";
import { TransactionRepo, TransactionTypeRepo } from "../../domain/transaction.repo";
import { TransactionAggregate, TransactionStatus } from "../../domain/transaction.domain";
import { TransactionCreated } from "../../domain/transaction.event";
import { TransactionTypeNotFound } from "../../domain/transaction.errors";

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler implements ICommandHandler<CreateTransactionCommand> {
  constructor(
    private readonly transactionRepo: TransactionRepo,
    private readonly transactionTypeRepo: TransactionTypeRepo,
    private readonly eventBus: EventBus,
  ) { }

  async execute(command: CreateTransactionCommand) {
    const transactionType = await this.transactionTypeRepo.getById(command.tranferTypeId);

    if (!transactionType) {
      throw new TransactionTypeNotFound(command.tranferTypeId);
    }

    const transaction = TransactionAggregate.fromDto({
      transactionExternalId: randomUUID(),
      accountExternalIdDebit: command.accountExternalIdDebit,
      accountExternalIdCredit: command.accountExternalIdCredit,
      transactionType: transactionType,
      transactionStatus: TransactionStatus.PENDING,
      value: command.value,
      createdAt: new Date(),
    })

    await this.transactionRepo.save(transaction);

    this.eventBus.publish(new TransactionCreated(transaction))
  }
}