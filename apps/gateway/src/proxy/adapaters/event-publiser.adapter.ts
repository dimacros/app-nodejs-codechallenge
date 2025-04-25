import { Inject, Injectable, Logger } from "@nestjs/common";
import { AsyncContext, IEvent, IEventPublisher } from "@nestjs/cqrs";
import { ANTIFRAUD_SERVICE } from "../proxy.constants";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class EventPublisherAdapter implements IEventPublisher<IEvent> {
  private readonly logger = new Logger(EventPublisherAdapter.name);

  constructor(
    @Inject(ANTIFRAUD_SERVICE)
    private readonly clientProxy: ClientProxy
  ) { }

  publish<TEvent extends IEvent>(event: TEvent): void {
    this.logger.debug(`Publishing event ${event.constructor.name}`);
    this.emitEvent(event);
  }

  publishAll<TEvent extends IEvent>(events: TEvent[], dispatcherContext?: unknown, asyncContext?: AsyncContext) {
    this.logger.debug(`Publishing events ${events.map(event => event.constructor.name).join(', ')}`, {
      dispatcherContext,
      asyncContext,
    });
  }

  private emitEvent(event: IEvent) {
    this.clientProxy.emit(this.transformEventName(event.constructor.name), { payload: event }).subscribe({
      next: () => this.logger.debug(`Event ${event.constructor.name} published successfully`),
      error: (error) => this.logger.error(`Failed to publish event ${event.constructor.name}`, error),
    });
  }

  private transformEventName(eventName: string): string {
    return eventName
      .replace(/([a-z])([A-Z])/g, '$1.$2') // Insert a dot between lowercase and uppercase letters
      .toLowerCase(); // Convert the entire string to lowercase
  }
}