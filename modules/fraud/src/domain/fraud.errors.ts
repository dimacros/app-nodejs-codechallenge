export class TransactionStateViolationError extends Error {
  constructor(
    readonly transactionId: string,
    readonly state: string,
  ) {
    super(`Transaction ${transactionId} is in ${state} state`);
    this.name = 'TransactionStateViolationError';
  }
}
