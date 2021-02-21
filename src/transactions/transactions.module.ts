import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionSchema } from './transactions.model';
import { AccountsService } from 'src/accounts/accounts.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AccountSchema } from 'src/accounts/accounts.model';

@Module({
    imports: [AccountsModule, MongooseModule.forFeature([{
        name: 'Transactions', schema: TransactionSchema
    }]),
        MongooseModule.forFeature([{
            name: 'Accounts', schema: AccountSchema
        }])],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})

export class TransactionsModule { }
