import { Inject, InternalServerErrorException, Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ClientProxy } from "@nestjs/microservices";
import { Contract } from "@yape-modules/transaction";
import { ANTIFRAUD_SERVICE } from "../proxy.constants";
import { of } from "rxjs";
import { TransactionEvents } from "./transaction.type";

@EventsHandler([
  'TransactionCreated',
  Contract.TransactionCreated,
  Contract.TransactionStatusUpdated
])
export class TransactionSubscriber implements IEventHandler<TransactionEvents> {
  private readonly logger = new Logger(TransactionSubscriber.name);

  constructor(
    @Inject(ANTIFRAUD_SERVICE)
    private readonly clientProxy: ClientProxy
  ) { }

  handle(event: TransactionEvents) {
    this.logger.debug(`Handling event ${event.constructor.name}`, {
      payload: event.toDto(),
    });

    switch (true) {
      case event instanceof Contract.TransactionCreated:
        return this.clientProxy.emit('transaction.review_requested', event.transaction.toDto());
      case event instanceof Contract.TransactionStatusUpdated:
        return of(event.transaction.toDto())
      default:
        throw new InternalServerErrorException(
          `Event ${event.constructor.name} not handled in TransactionSubscriber`
        );
    }

  }
}