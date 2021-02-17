import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Account } from './accounts.model';

@Injectable()
export class AccountsService {
    accounts: Account[] = [];

    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) { }

    insertAccount(account_holder_name: string, account_number: number, starting_balance: number, created_on: Date, expires_in: Date,) {
        const account = new this.accountModel({
            account_holder_name,
            account_number,
            starting_balance,
            created_on,
            expires_in
        })
        account.save();
        return account;
    }
}
