import { Module } from "@nestjs/common";
import { TransactionController } from "./v1/transaction.controller";
import { TransactionModule } from "@yape-modules/transaction";

@Module({
  imports: [
    TransactionModule.forFeature(),
  ],
  controllers: [
    TransactionController,
  ],
  providers: [],
  exports: [],
})
export class ApiModule { }