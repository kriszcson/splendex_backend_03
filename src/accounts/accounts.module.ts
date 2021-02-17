import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountSchema } from './accounts.model';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Account', schema: AccountSchema
    }])],
    controllers: [AccountsController],
    providers: [AccountsService]
})

export class AccountsModule { }