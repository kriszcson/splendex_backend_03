import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import * as mongoose from 'mongoose';


import { TransactionsService } from "./transactions.service";
import { TransactionType } from './transactions.model';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AccountsService } from "src/accounts/accounts.service";

@Controller('transactions')
export class TransactionsController {

    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly accountService: AccountsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTransactions() {
        const transactions = await this.transactionsService.getAll();
        return {
            count: transactions.length,
            transactions
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getSingleTransaction(
        @Param('id') id: string
    ) {
        const transactionById = await this.transactionsService.getSingleTransaction(id);
        return transactionById;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async insertTransaction(
        @Body('account') accountId: any,
        @Body('transaction_name') transaction_name: string,
        @Body('transaction_type') transaction_type: any,
        @Body('transaction_amount') transaction_amount: number,
        @Body('started_on') started_on: Date,
        @Body('finished_on') finished_on: Date
    ) {
        const balancing = await this.accountService.balanceAccount(accountId, transaction_amount, transaction_type);
        if (balancing.account) {
            return await this.transactionsService.insertOne(
                accountId,
                transaction_name,
                transaction_type,
                transaction_amount,
                started_on,
                finished_on,
                balancing
            );
        }
        else {
            return {
                message: 'Not enough money!'
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateTransaction(
        @Param('id') id: string,
        @Body('account') account: mongoose.Schema.Types.ObjectId,
        @Body('transaction_name') transaction_name: string,
        @Body('transaction_type') transaction_type: TransactionType.Enum,
        @Body('transaction_amount') transaction_amount: number,
        @Body('started_on') started_on: Date,
        @Body('finished_on') finished_on: Date
    ) {
        return await this.transactionsService.updateById(
            id,
            account,
            transaction_name,
            transaction_type,
            transaction_amount,
            started_on,
            finished_on
        )
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteTransaction(
        @Param('id') id: string
    ) {
        return await this.transactionsService.deleteById(id);
    }
}