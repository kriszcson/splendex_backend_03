import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    account_number: { type: Number, required: true },
    transaction_type: { type: String, required: true },
    transaction_amount: { type: Number, required: true },
    transaction_started: { type: Date, required: true },
    transaction_finished: { type: Date, required: true },
})

export interface Transaction extends mongoose.Document {
    _id: string;
    account_number: number;
    transaction_type: TransactionType.Enum;
    transaction_amount: number;
    transaction_started: Date;
    transaction_finished: Date;
}

export namespace TransactionType {
    export enum Enum {
        INCOME,
        EXPENSE
    }
}