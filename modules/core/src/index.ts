import databaseConfig from './config/database.config';
import fraudKafkaConfig from './config/fraud-kafka.config';
import transactionKafkaConfig from './config/transaction-kafka.config';

import * as fraudProxy from './fraud-proxy';
import * as transactionProxy from './transaction-proxy';
import * as db from './database';

export const config = {
  databaseConfig,
  fraudKafkaConfig,
  transactionKafkaConfig,
}

export { db }
export { fraudProxy }
export { transactionProxy }

export * from './core.module';
