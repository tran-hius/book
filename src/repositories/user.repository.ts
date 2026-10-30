import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { CreateUserDTO } from "../dtos/user.js";
import { User } from "../models/user.js";

export class UserRepository {
    constructor(private readonly db: Pool) {

    }

    async getById(id: number): Promise<User | null> {
        const sql = "SELECT * FROM users WHERE id = ?"
        const [rows] = await this.db.execute<RowDataPacket[]>(sql, [id])
        if (rows.length === 0) {
            return null
        }
        const user = rows[0]
        return User.toObject(user)
    }

    async getByEmailOrPhone(email: string, phone: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE email = ? OR phone = ? LIMIT 1`
        const [rows] = await this.db.execute<RowDataPacket[]>(sql, [email, phone])
        if (rows.length === 0) {
            return null
        }
        const user = rows[0]
        return User.toObject(user)
    }

    async create(data: CreateUserDTO): Promise<number> {
        const sql = `INSERT INTO users 
                     (username, email, password, full_name, role, phone, avatar_url)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            data.username,
            data.email,
            data.password ?? null,
            data.fullName,
            data.role,
            data.phone ?? null,
            data.avatarUrl ?? null
        ]

        const [result] = await this.db.execute<ResultSetHeader>(sql, values)

        return result.insertId
    }
}