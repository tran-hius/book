import { CreateUserDTO } from "../dtos/user.js";
import { User } from "../models/user.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/error.handler.js";
import { Hasher } from "../utils/hash.js";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {

    }

    // async create(data: CreateUserDTO): Promise<User> {

    //     const email = data.email.toLowerCase().trim()
    //     const phone = data.phone ? data.phone.trim() : undefined

    //     const existingUser = await this.userRepository.getByEmailOrPhone(email, phone ?? "")
    //     if (existingUser) {
    //         if (existingUser.email === email) {
    //             throw new AppError("Email đã được sử dụng", 409)
    //         }
    //         if (existingUser.phone === phone) {
    //             throw new AppError("Số điện thoại đã được sử dụng", 409)
    //         }
    //     }


    //     const hashedPassword = await Hasher.hashPassword(data.password)

    //     const newUser = {
    //         ...data,
    //         email,
    //         phone,
    //         password: hashedPassword
    //     }

    //     return await this.userRepository.create(newUser)
    // }
}