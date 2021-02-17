import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [AccountsModule, MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.vripv.mongodb.net/SPL_bank?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }