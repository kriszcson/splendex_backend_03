import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    account_holder_name: { type: String, required: true },
    account_number: { type: Number, required: true },
    starting_balance: { type: Number, required: true },
    created_on: { type: Date, required: true },
    expires_in: { type: Date, required: true },
})

export interface Account extends mongoose.Document {
    _id: string;
    account_holder_name: string;
    account_number: number;
    starting_balance: number;
    created_on: Date;
    expires_in: Date;
}
