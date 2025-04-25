import { Contract } from "@yape-modules/transaction";

export type TransactionEvents =
  Contract.TransactionCreated |
  Contract.TransactionStatusUpdated |
  Contract.TransactionEvent