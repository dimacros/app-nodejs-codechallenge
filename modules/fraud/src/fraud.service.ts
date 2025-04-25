import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CheckTransactionCommand } from './app/commands/check-transaction.command';
import { defer } from 'rxjs';

@Injectable()
export class FraudService {
  constructor(private readonly commandBus: CommandBus) {}

  checkTransaction(dto: CheckTransactionCommand) {
    return defer(() => this.commandBus.execute(dto));
  }
}
