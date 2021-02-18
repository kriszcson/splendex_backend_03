import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionSchema } from './transactions.model';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Transactions', schema: TransactionSchema
    }])],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})

export class TransactionsModule { }
