import { randomUUID } from 'node:crypto';
import { PrismaClient } from '../client';

const prismaClient = new PrismaClient();

export async function seed() {
  await prismaClient.transactionType.createMany({
    data: [
      { id: 1, name: 'TRANSFER' },
      { id: 2, name: 'PAYMENT' },
      { id: 3, name: 'CHARGEBACK' },
    ],
    skipDuplicates: true,
  });

  await prismaClient.transactionStatus.createMany({
    data: [
      { id: 1, name: 'PENDING' },
      { id: 2, name: 'COMPLETED' },
      { id: 3, name: 'FAILED' },
    ],
    skipDuplicates: true,
  });

  await prismaClient.transaction.createMany({
    data: [
      {
        transactionExternalId: `transaction_${randomUUID().replaceAll('-', '')}`,
        accountExternalIdDebit: `yape_${randomUUID().replaceAll('-', '')}`,
        accountExternalIdCredit: `yape_${randomUUID().replaceAll('-', '')}`,
        value: 70,
        transactionTypeId: 1,
        transactionStatusId: 2
      }
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