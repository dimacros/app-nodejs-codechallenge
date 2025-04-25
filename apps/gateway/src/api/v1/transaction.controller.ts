import { Body, Controller, Get, NotFoundException, Param, Post, Query, UnprocessableEntityException, UsePipes, ValidationPipe } from "@nestjs/common";
import { Contract, TransactionService } from "@yape-modules/transaction";

@Controller("v1/transactions")
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTransaction(@Body() dto: Contract.CreateTransactionCommand) {
    try {
      await this.transactionService.createTransaction(dto);
    } catch (err) {
      if (err instanceof Contract.DomainError) {
        throw new UnprocessableEntityException(err.message);
      }

      throw err;
    }
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTransactions(@Query() dto: Contract.GetAllTransactionsQuery) {
    return this.transactionService.getAllTransactions(dto);
  }

  @Get(':transactionExternalId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTransactionById(@Param() dto: Contract.GetTransactionQuery) {
    try {
      const result = await this.transactionService.getTransactionById(dto);

      return result;
    } catch (error) {
      if (error instanceof Contract.TransactionNotFound) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}