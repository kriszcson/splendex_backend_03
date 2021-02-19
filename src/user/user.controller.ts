import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll() {
        return this.userService.getAll();
    }

    @Get(':email')
    async findByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }
}


