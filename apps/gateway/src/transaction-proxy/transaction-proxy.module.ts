import { Module } from "@nestjs/common";
import { EventPublisherAdapter } from "./adapters/event-publisher.adapter";
import { CommandPublisherAdapter } from "./adapters/command-publisher.adapter";
import { QueryPublisherAdapter } from "./adapters/query-publisher.adapter";

@Module({
  imports: [],
  providers: [
    CommandPublisherAdapter,
    EventPublisherAdapter,
    QueryPublisherAdapter,
  ],
  exports: [
    CommandPublisherAdapter,
    EventPublisherAdapter,
    QueryPublisherAdapter,
  ],
})
export class TransactionProxyModule { }
