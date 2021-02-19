import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";


@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>) { }

    async getAll() {
        const allUsers = await this.userModel.find().exec();
        return allUsers.map((user) => ({
            _id: user.id,
            email: user.email,
            password: user.password
        }))
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.userModel.findOne({ email: email }).exec();
        console.log(user);
        return user;
    }

    /* 
    private async findUser(id: string): Promise<User> {
        let user: Promise<User>;
        try {
            user = this.userModel.findById(id).exec();
        } catch (err) {
            throw new NotFoundException('Could not find transaction!');
        }
        return user;
    } */

}