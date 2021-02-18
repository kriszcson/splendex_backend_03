import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { AccountsService } from "./accounts.service";
import { Account } from './accounts.model';

@Controller('accounts')
export class AccountsController {

    constructor(private readonly accountService: AccountsService) { }

    @Post()
    async addACcount(
        @Body('account_holder_name') account_holder_name: string,
        @Body('account_number') account_number: number,
        @Body('starting_balance') starting_balance: number,
        @Body('created_on') created_on: Date,
        @Body('expires_in') expires_in: Date,
    ): Promise<Object> {
        const account = await this.accountService.insertAccount(
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

    @Get()
    async getAllAccounts() {
        const accounts = await this.accountService.getAccounts();
        return {
            count: accounts.length,
            accounts: accounts
        };
    }

    @Get(':id')
    async getAccountById(@Param('id') id: string) {
        return this.accountService.getSignleAccount(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id') id: string,
        @Body('account_holder_name') account_holder_name: string,
        @Body('account_number') account_number: number,
        @Body('starting_balance') starting_balance: number,
        @Body('created_on') created_on: Date,
        @Body('expires_in') expires_in: Date
    ) {
        return await this.accountService.updateAccount(id, account_holder_name, account_number, starting_balance, created_on, expires_in);
    }

    @Delete(':id')
    async deleteById(
        @Param('id') id: string) {
        return await this.accountService.deleteAccount(id);
    }
}