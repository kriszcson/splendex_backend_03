import { Controller, Get } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";

@Controller('transactions')
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) {

    }
    @Get()
    getHello() {
        return this.transactionsService.hello();
    }

}