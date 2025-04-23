import { randomUUID } from 'node:crypto';
import { PrismaClient, TransactionStatus } from '../client';

const prismaClient = new PrismaClient();

export async function seed() {
  const wallets = {
    'maria': {
      accountExternalId: `account_${randomUUID().replace(/-/g, '')}`,
      balance: 200,
    },
    'pedro': {
      accountExternalId: `account_${randomUUID().replace(/-/g, '')}`,
      balance: 150,
    },
    'marcos': {
      accountExternalId: `account_${randomUUID().replace(/-/g, '')}`,
      balance: 170,
    },
    'ana': {
      accountExternalId: `account_${randomUUID().replace(/-/g, '')}`,
      balance: 130,
    },
  }

  await prismaClient.transactionType.createMany({
    data: [
      { id: 1, name: 'TRANSFER' },
      { id: 2, name: 'PAYMENT' },
      { id: 3, name: 'CHARGEBACK' },
    ],
    skipDuplicates: true,
  });

  await prismaClient.wallet.createMany({
    data: [
      wallets.maria,
      wallets.pedro,
      wallets.marcos,
      wallets.ana,
    ]
  });

  await prismaClient.transaction.createMany({
    data: [
      {
        accountExternalIdCredit: wallets.maria.accountExternalId,
        accountExternalIdDebit: wallets.pedro.accountExternalId,
        transactionExternalId: `transaction_${randomUUID().replace(/-/g, '')}`,
        transactionTypeId: 1,
        transactionStatus: TransactionStatus.COMPLETED,
        value: 20,
      },
      {
        accountExternalIdCredit: wallets.pedro.accountExternalId,
        accountExternalIdDebit: wallets.maria.accountExternalId,
        transactionExternalId: `transaction_${randomUUID().replace(/-/g, '')}`,
        transactionTypeId: 1,
        transactionStatus: TransactionStatus.COMPLETED,
        value: 10,
      },
      {
        accountExternalIdCredit: wallets.marcos.accountExternalId,
        accountExternalIdDebit: wallets.ana.accountExternalId,
        transactionExternalId: `transaction_${randomUUID().replace(/-/g, '')}`,
        transactionTypeId: 1,
        transactionStatus: TransactionStatus.COMPLETED,
        value: 30,
      },
      {
        accountExternalIdCredit: wallets.ana.accountExternalId,
        accountExternalIdDebit: wallets.marcos.accountExternalId,
        transactionExternalId: `transaction_${randomUUID().replace(/-/g, '')}`,
        transactionTypeId: 1,
        transactionStatus: TransactionStatus.COMPLETED,
        value: 15,
      },
    ]
  });
}

seed()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error('Seeding failed:', e);
  })
  .finally(async () => {
    await prismaClient.$disconnect();

    process.exit(0);
  });