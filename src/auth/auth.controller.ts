import { Body, Controller, Post } from "@nestjs/common";

@Controller('')
export class AuthController {


    @Post('login')
    logIn(
        @Body('email') email: string,
        @Body('password') password: string
    ) {

    }
}