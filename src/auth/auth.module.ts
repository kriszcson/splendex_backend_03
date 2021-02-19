import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: "12345678",
        signOptions: { expiresIn: '60s' },
    }),],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})

export class AuthModule { }
