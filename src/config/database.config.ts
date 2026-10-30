import { DatabaseConfig } from "../interfaces/database.interface.js"

export const loadDatabaseConfig = (env: NodeJS.ProcessEnv = process.env): DatabaseConfig => {
    const port = Number(env.DB_PORT ?? 3306)
    if (Number.isNaN(port)) {
        throw new Error("DB_PORT phải là số")
    }

    if (!env.DB_HOST || !env.DB_USER || !env.DB_PASSWORD || !env.DB_NAME) {
        throw new Error("Thiếu biến môi trường database (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)")
    }

    return {
        host: env.DB_HOST,
        port,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        connectionLimit: Number(env.DB_POOL_LIMIT ?? 10),
    }
}
