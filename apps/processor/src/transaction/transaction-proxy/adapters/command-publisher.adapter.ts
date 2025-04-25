import { Inject, Injectable, Logger } from "@nestjs/common";
import { ICommandPublisher, Command, ICommand } from "@nestjs/cqrs";
import { ClientKafkaProxy } from "@nestjs/microservices";
import { TRANSACTION_SERVICE } from "../transaction-proxy.constants";
import { helper } from "@yape-modules/core";

@Injectable()
export class CommandPublisherAdapter implements ICommandPublisher<ICommand> {
  private readonly logger = new Logger(CommandPublisherAdapter.name);

  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly clientProxy: ClientKafkaProxy,
  ) { }

  publish<ICommand>(dto: ICommand): void {
    const command = dto as Command<unknown>;

    this.logger.debug(`Publishing command ${helper.messagePatternFromClass(command.constructor.name)}`);

    this.clientProxy.emit(
      helper.messagePatternFromClass(command.constructor.name),
      { payload: command },
    )
  }
}