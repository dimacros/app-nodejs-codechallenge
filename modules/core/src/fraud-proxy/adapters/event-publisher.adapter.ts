import { Inject, Injectable, Logger } from "@nestjs/common";
import { IEvent, IEventPublisher } from "@nestjs/cqrs";
import { ClientProxy } from "@nestjs/microservices";
import { FRAUD_SERVICE } from "../fraud-proxy.constants";
import { messagePatternFromClass } from "../../helper/util";
import { throwError } from "rxjs";

@Injectable()
export class EventPublisherAdapter implements IEventPublisher<IEvent> {
  private readonly logger = new Logger(EventPublisherAdapter.name);

  constructor(
    @Inject(FRAUD_SERVICE)
    private readonly clientProxy: ClientProxy,
  ) { }

  publish<TEvent extends IEvent>(event: TEvent): void {
    this.logger.debug(`Publishing event ${event.constructor.name}`);

    this.clientProxy.emit(
      messagePatternFromClass(event.constructor.name),
      { payload: event },
    )
  }

  publishAll<TEvent extends IEvent>(_: TEvent[]) {
    return throwError(() => new Error("Not implemented"));
  }
}