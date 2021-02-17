import { Body, Controller, Post } from "@nestjs/common";

import { AccountsService } from "./accounts.service";
import { Account } from './accounts.model';

@Controller('accounts')
export class AccountsController {

    constructor(private readonly accountService: AccountsService) { }

    @Post()
    addACcount(
        @Body('account_holder_name') account_holder_name: string,
        @Body('account_number') account_number: number,
        @Body('starting_balance') starting_balance: number,
        @Body('created_on') created_on: Date,
        @Body('expires_in') expires_in: Date,

    ): any {
        const account = this.accountService.insertAccount(
            account_holder_name,
            account_number,
            starting_balance,
            created_on,
            expires_in
        );
        return {
            name: account_holder_name,
            number: account_number,
            balance: starting_balance,
            created_on: created_on,
            expires_in: expires_in
        }
    }
}