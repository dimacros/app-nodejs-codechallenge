import { Inject, Injectable, Logger } from "@nestjs/common";
import { IQuery, IQueryPublisher, Query } from "@nestjs/cqrs";
import { ClientKafkaProxy } from "@nestjs/microservices";
import { TRANSACTION_SERVICE } from "../transaction-proxy.constants";
import { helper } from "@yape-modules/core";

@Injectable()
export class QueryPublisherAdapter implements IQueryPublisher<IQuery> {
  private readonly logger = new Logger(QueryPublisherAdapter.name);

  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly clientProxy: ClientKafkaProxy,
  ) { }

  publish<IQuery>(dto: IQuery): void {
    const query = dto as Query<unknown>;

    this.logger.debug(`Publishing query ${helper.messagePatternFromClass(query.constructor.name)}`);

    this.clientProxy.send(
      helper.messagePatternFromClass(query.constructor.name),
      query,
    )
  }
}