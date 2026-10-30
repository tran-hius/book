import { RedisConfig } from "../interfaces/redis.interface.js"

export const loadRedisConfig = (env: NodeJS.ProcessEnv = process.env): RedisConfig => {
    const port = Number(env.REDIS_PORT ?? 6379)
    if (Number.isNaN(port)) {
        throw new Error("REDIS_PORT phải là số")
    }

    return {
        host: env.REDIS_HOST ?? "localhost",
        port,
        password: env.REDIS_PASSWORD || undefined,
        db: Number(env.REDIS_DB ?? 0),
        keyPrefix: env.REDIS_KEY_PREFIX ?? "bookstore:",
        defaultTtl: Number(env.REDIS_TTL ?? 300),
    }
}