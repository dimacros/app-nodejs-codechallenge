import { Inject, Injectable, Logger } from '@nestjs/common';
import { IEvent, IEventPublisher } from '@nestjs/cqrs';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { FRAUD_SERVICE } from '../fraud-proxy.constants';
import { helper } from '@yape-modules/core';
import { throwError } from 'rxjs';

@Injectable()
export class EventPublisherAdapter implements IEventPublisher<IEvent> {
  private readonly logger = new Logger(EventPublisherAdapter.name);

  constructor(
    @Inject(FRAUD_SERVICE)
    private readonly clientProxy: ClientKafkaProxy,
  ) {}

  publish<TEvent extends IEvent>(event: TEvent): void {
    this.logger.debug(`Publishing event ${event.constructor.name}`);

    this.clientProxy.emit(
      helper.messagePatternFromClass(event.constructor.name),
      { payload: event },
    );
  }

  publishAll<TEvent extends IEvent>(_: TEvent[]) {
    return throwError(() => new Error('Not implemented'));
  }
}
