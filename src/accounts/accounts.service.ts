import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Account } from './accounts.model';

@Injectable()
export class AccountsService {
    accounts: Account[] = [];

    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) { }

    async insertAccount(account_holder_name: string, account_number: number, starting_balance: number, created_on: Date, expires_in: Date,) {
        const account = new this.accountModel({
            account_holder_name,
            account_number,
            starting_balance,
            created_on,
            expires_in
        })
        await account.save();
        return account;
    }

    async getAccounts() {
        const accounts = await this.accountModel.find().exec();
        return accounts.map((acc) => ({
            account_holder_name: acc.account_holder_name,
            account_number: acc.account_number,
            starting_balance: acc.starting_balance,
            created_on: acc.created_on,
            expires_in: acc.expires_in
        }))
    }

    async getSignleAccount(id: string) {
        const acc = await this.findAccount(id);
        return {
            account_holder_name: acc.account_holder_name,
            account_number: acc.account_number,
            starting_balance: acc.starting_balance,
            created_on: acc.created_on,
            expires_in: acc.expires_in
        };

    }
    async updateAccount(
        id: string,
        account_holder_name: string,
        account_number: number,
        starting_balance: number,
        created_on: Date,
        expires_in: Date) {
        const account = await this.findAccount(id);
        let updatedProps = [];

        if (account_holder_name) {
            account.account_holder_name = account_holder_name;
            updatedProps.push({ account_holder_name: account.account_holder_name });
        }
        if (account_number) {
            account.account_number = account_number;
            updatedProps.push({ account_number: account.account_number });
        }
        if (account.starting_balance) {
            account.starting_balance = starting_balance;
            updatedProps.push({ starting_balance: account.starting_balance });
        }
        if (account.created_on) {
            account.created_on = created_on;
            updatedProps.push({ created_on: account.created_on });
        }
        if (account.expires_in) {
            account.expires_in = expires_in;
            updatedProps.push({ expires_in: account.expires_in });
        }
        account.save();
        return {
            message: 'Succesfully updated!',
            updated_properties: updatedProps
        }
    }

    async deleteAccount(id: string) {
        const result = await this.accountModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could nod find account!');
        }
        return { message: 'Successfully deleted account!' };
    }

    private async findAccount(id: string) {
        let account;
        try {
            account = await this.accountModel.findById(id).exec();
        } catch (err) {
            throw new NotFoundException('Could nod find account!');
        }
        return account;
    }
}

