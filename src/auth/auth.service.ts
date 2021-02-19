import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        return bcrypt.compare(pass, user.password);
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        console.log(payload);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
