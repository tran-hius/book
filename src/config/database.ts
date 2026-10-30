import mysql, { Pool } from "mysql2/promise"
import { DatabaseConfig } from "../interfaces/database.interface.js"

export type SqlParams = unknown

export class Database {
    private static instance: Database | null = null
    private readonly pool: Pool

    private constructor(config: DatabaseConfig) {
        this.pool = mysql.createPool({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database,
            waitForConnections: true,
            connectionLimit: config.connectionLimit,
            queueLimit: 0,
            enableKeepAlive: true,
            charset: "utf8mb4",
        })
    }

    static getInstance(config?: DatabaseConfig): Database {
        if (Database.instance === null) {
            if (!config) {
                throw new Error("Database chưa được khởi tạo. Cần truyền config lần đầu.")
            }
            Database.instance = new Database(config)
        }
        return Database.instance
    }

    async connect(): Promise<void> {
        const connection = await this.pool.getConnection();
        try {
            await connection.ping();
            console.log("Connected database");
        } catch (error) {
            console.error("Database connection failed:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    getPool(): Pool {
        return this.pool
    }

    async close(): Promise<void> {
        await this.pool.end();
        Database.instance = null;
    }
}
