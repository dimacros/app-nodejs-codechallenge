import { Inject, Injectable, Logger } from "@nestjs/common";
import { IEvent, IEventPublisher } from "@nestjs/cqrs";
import { ClientKafkaProxy } from "@nestjs/microservices";
import { TRANSACTION_SERVICE } from "../transaction-proxy.constants";
import { throwError } from "rxjs";
import { helper } from "@yape-modules/core";

@Injectable()
export class EventPublisherAdapter implements IEventPublisher<IEvent> {
  private readonly logger = new Logger(EventPublisherAdapter.name);

  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly clientProxy: ClientKafkaProxy,
  ) { }

  publish<TEvent extends IEvent>(event: TEvent): void {
    this.logger.debug(`Publishing event ${event.constructor.name}`);

    this.clientProxy.emit(
      helper.messagePatternFromClass(event.constructor.name),
      event,
    )
  }

  publishAll<TEvent extends IEvent>(_: TEvent[]) {
    return throwError(() => new Error("Not implemented"));
  }
}