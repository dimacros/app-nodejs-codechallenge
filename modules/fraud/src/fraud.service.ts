import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

@Injectable()
export class FraudService {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  async processTransaction() {
  }
}