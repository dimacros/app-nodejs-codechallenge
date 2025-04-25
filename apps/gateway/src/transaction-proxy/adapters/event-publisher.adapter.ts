import { Inject, Injectable, Logger } from "@nestjs/common";
import { IEvent, IEventPublisher } from "@nestjs/cqrs";
import { ClientKafkaProxy } from "@nestjs/microservices";
import { TRANSACTION_SERVICE } from "../transaction-proxy.constants";
import { throwError } from "rxjs";
import { helper } from "@yape-modules/core";
import { FRAUD_SERVICE } from "../../fraud-proxy/fraud-proxy.constants";

@Injectable()
export class EventPublisherAdapter implements IEventPublisher<IEvent> {
  private readonly logger = new Logger(EventPublisherAdapter.name);

  constructor(
    @Inject(FRAUD_SERVICE)
    private readonly fraudProxy: ClientKafkaProxy,
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
    this.logger.debug(`Publishing events ${_.map((e) => e.constructor.name).join(", ")}`);

    _.forEach((event) => {
      if (event.constructor.name === "TransactionCreatedEvent") {
        return this.fraudProxy.emit(
          helper.messagePatternFromClass(event.constructor.name),
          event,
        );
      }

      this.clientProxy.emit(
        helper.messagePatternFromClass(event.constructor.name),
        event,
      );
    });
  }
}