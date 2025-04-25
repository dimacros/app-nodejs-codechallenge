import { Inject, Injectable, Logger } from "@nestjs/common";
import { ICommandPublisher, Command, ICommand } from "@nestjs/cqrs";
import { ClientProxy } from "@nestjs/microservices";
import { TRANSACTION_SERVICE } from "../transaction-proxy.constants";
import { messagePatternFromClass } from "../../helper/util";

@Injectable()
export class CommandPublisherAdapter implements ICommandPublisher<ICommand> {
  private readonly logger = new Logger(CommandPublisherAdapter.name);

  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly clientProxy: ClientProxy,
  ) { }

  publish<ICommand>(dto: ICommand): void {
    const command = dto as Command<unknown>;

    this.logger.debug(`Publishing command ${command.constructor.name}`);

    this.clientProxy.send(
      messagePatternFromClass(command.constructor.name),
      { payload: command },
    )
  }
}