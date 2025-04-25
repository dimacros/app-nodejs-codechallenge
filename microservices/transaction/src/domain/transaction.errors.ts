export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class TransactionTypeNotFound extends DomainError {
  constructor(transactionTypeId: number) {
    super(`Transaction type with id ${transactionTypeId} not found`);
    this.name = 'TransactionTypeNotFound';
  }
}

export class TransactionNotFound extends DomainError {
  constructor(transactionId: string) {
    super(`Transaction with id ${transactionId} not found`);
    this.name = 'TransactionNotFound';
  }
}