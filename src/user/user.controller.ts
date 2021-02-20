import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PassThrough } from 'stream';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll() {
        return await this.userService.getAll();
    }

    @Get(':email')
    async findByEmail(@Param('email') email: string) {
        return await this.userService.findByEmail(email);
    }

    @Post('signup')
    async signUp(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        return await this.userService.createUser(email, password);
    }
}