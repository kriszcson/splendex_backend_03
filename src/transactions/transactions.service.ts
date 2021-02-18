import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "./transactions.model";

@Injectable()
export class TransactionsService {
    transactions: Transaction[] = [];

    constructor(@InjectModel('Transactions') private readonly transactionsModel: Model<Transaction>) { }

    hello() {
        return { message: 'Helo!' };
    }

}