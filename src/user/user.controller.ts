import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Get()
    async getAll() {
        return this.UserService.getAll();
    }

}


