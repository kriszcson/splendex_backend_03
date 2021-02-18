import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    transaction_name: { type: String, required: true },
    transaction_type: { type: String, required: true },
    transaction_amount: { type: Number, required: true },
    started_on: { type: Date, required: true },
    finished_on: { type: Date, required: true },
})

export interface Transaction extends mongoose.Document {
    _id: string;
    account: mongoose.Schema.Types.ObjectId;
    transaction_name: string;
    transaction_type: TransactionType.Enum;
    transaction_amount: number;
    started_on: Date;
    finished_on: Date;
}

export namespace TransactionType {
    export enum Enum {
        INCOME = 'bevétel',
        EXPENSE = 'kiadás'
    }
}