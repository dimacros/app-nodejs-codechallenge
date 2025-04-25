import { Body, Controller, Get, NotFoundException, Param, Post, Query, UnprocessableEntityException, UsePipes, ValidationPipe } from "@nestjs/common";
import { Contract, TransactionService } from "@yape-modules/transaction";
import { catchError, throwError } from "rxjs";

@Controller("v1/transactions")
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createTransaction(@Body() dto: Contract.CreateTransactionCommand) {
    return this.transactionService.createTransaction(dto).pipe(
      catchError(err => {
        if (err instanceof Contract.DomainError) {
          return throwError(() => new UnprocessableEntityException(err.message));
        }

        return throwError(() => err);
      })
    )
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getTransactions(@Query() dto: Contract.GetAllTransactionsQuery) {
    return this.transactionService.getAllTransactions(dto);
  }

  @Get(':transactionExternalId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTransactionById(@Param() dto: Contract.GetTransactionQuery) {
    return this.transactionService.getTransactionById(dto).pipe(
      catchError(err => {
        if (err instanceof Contract.TransactionNotFound) {
          return throwError(() => new NotFoundException(err.message));
        }

        return throwError(() => err);
      })
    )
  }
}