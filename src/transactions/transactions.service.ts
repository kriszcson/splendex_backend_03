import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Model } from "mongoose";

import { Transaction, TransactionType } from "./transactions.model";

@Injectable()
export class TransactionsService {
    transactions: Transaction[] = [];

    constructor(@InjectModel('Transactions') private readonly transactionsModel: Model<Transaction>) { }

    async getAll() {
        const transactions = await this.transactionsModel
            .find()
            .populate('account', 'starting_balance, account_holder_name')
            .exec();
        return transactions.map((transaction) => ({
            account: transaction.account,
            transaction_name: transaction.transaction_name,
            transaction_type: transaction.transaction_type,
            transaction_amount: transaction.transaction_amount,
            started_on: transaction.started_on,
            finished_on: transaction.finished_on,
        }))
    }

    async insertOne(
        account: mongoose.Schema.Types.ObjectId,
        transaction_name: string,
        transaction_type: string,
        transaction_amount: number,
        started_on: Date,
        finished_on: Date,) {
        const transactionType = this.getEnumFromString(transaction_type);
        if (transactionType) {
            const newTransaction = new this.transactionsModel({
                account,
                transaction_name,
                transaction_type: transactionType,
                transaction_amount,
                started_on: new Date(started_on),
                finished_on: new Date(finished_on),
            })
            await newTransaction.save();
            return newTransaction;
        } else {
            return { message: 'Not valid transaction type inserted' };
        }
    }

    async getSingleTransaction(id: string) {
        const transaction = await this.findTransaction(id);
        return {
            id: transaction._id,
            account: transaction.account,
            transaction_name: transaction.transaction_name,
            transaction_type: transaction.transaction_type,
            transaction_amount: transaction.transaction_amount,
            started_on: transaction.started_on,
            finished_on: transaction.finished_on,
        }
    }

    async updateById(
        id: string,
        account: mongoose.Schema.Types.ObjectId,
        transaction_name: string,
        transaction_type: TransactionType.Enum,
        transaction_amount: number,
        started_on: Date,
        finished_on: Date
    ) {
        const transaction = await this.findTransaction(id);
        let updatedProps = [];
        if (account) {
            transaction.account = account;
            updatedProps.push({ account: transaction.account });
        }
        if (transaction_name) {
            transaction.transaction_name = transaction_name;
            updatedProps.push({ transaction_name: transaction.transaction_name });
        }
        if (transaction_type) {
            transaction.transaction_type = transaction_type;
            updatedProps.push({ transaction_type: transaction.transaction_type });
        }
        if (transaction_amount) {
            transaction.transaction_amount = transaction_amount;
            updatedProps.push({ transaction_amount: transaction.transaction_amount });
        }
        if (started_on) {
            transaction.started_on = started_on;
            updatedProps.push({ created_on: transaction.started_on });
        }
        if (finished_on) {
            transaction.finished_on = finished_on;
            updatedProps.push({ finished_on: transaction.finished_on });
        }
        await transaction.save();
        return {
            message: 'Succesfully updated!',
            updated_properties: updatedProps
        }
    }

    async deleteById(id: string) {
        const result = await this.transactionsModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find transaction!');
        }
        return { message: 'Successfully deleted transaction!' };
    }
    /* 
        private getStringFromEnum(transaction_type: TransactionType.Enum) {
            switch (transaction_type) {
                case TransactionType.Enum.EXPENSE: {
                    return 'kiadás';
                    break;
                }
                case TransactionType.Enum.INCOME: {
                    return 'bevétel';
                    break;
                }
            }
        }
     */

    private getEnumFromString(transaction_type: string) {
        switch (transaction_type) {
            case TransactionType.Enum.EXPENSE: {
                return TransactionType.Enum.EXPENSE;
                break;
            }
            case TransactionType.Enum.INCOME: {
                return TransactionType.Enum.INCOME;
                break;
            }
            default: {
                return null;
                break;
            }
        }
    }

    private async findTransaction(id: string): Promise<Transaction> {
        let transaction: Promise<Transaction>;
        try {
            transaction = this.transactionsModel.findById(id).exec();
        } catch (err) {
            throw new NotFoundException('Could not find transaction!');
        }
        return transaction;
    }
}