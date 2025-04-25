import { Inject, Injectable, Logger } from "@nestjs/common";
import { IQuery, IQueryPublisher, Query } from "@nestjs/cqrs";
import { ClientKafkaProxy } from "@nestjs/microservices";
import { FRAUD_SERVICE } from "../fraud-proxy.constants";
import { helper } from "@yape-modules/core";

@Injectable()
export class QueryPublisherAdapter implements IQueryPublisher<IQuery> {
  private readonly logger = new Logger(QueryPublisherAdapter.name);

  constructor(
    @Inject(FRAUD_SERVICE)
    private readonly clientProxy: ClientKafkaProxy,
  ) { }

  publish<IQuery>(dto: IQuery): void {
    const query = dto as Query<unknown>;

    this.logger.debug(`Publishing command ${helper.messagePatternFromClass(query.constructor.name)}`);

    this.clientProxy.emit(
      helper.messagePatternFromClass(query.constructor.name),
      { payload: query },
    )
  }
}