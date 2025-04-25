import { Inject, Injectable, Logger } from "@nestjs/common";
import { IQuery, IQueryPublisher, Query } from "@nestjs/cqrs";
import { ClientProxy } from "@nestjs/microservices";
import { FRAUD_SERVICE } from "../fraud-proxy.constants";
import { messagePatternFromClass } from "../../helper/util";

@Injectable()
export class QueryPublisherAdapter implements IQueryPublisher<IQuery> {
  private readonly logger = new Logger(QueryPublisherAdapter.name);

  constructor(
    @Inject(FRAUD_SERVICE)
    private readonly clientProxy: ClientProxy,
  ) { }

  publish<IQuery>(dto: IQuery): void {
    const query = dto as Query<unknown>;

    this.logger.debug(`Publishing command ${messagePatternFromClass(query.constructor.name)}`);

    this.clientProxy.send(
      messagePatternFromClass(query.constructor.name),
      { payload: query },
    )
  }
}