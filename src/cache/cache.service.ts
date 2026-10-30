import { RedisConnection } from "../config/redis.js";
import { ICache } from "./cache.interface.js";
import { RedisConfig } from "../interfaces/redis.interface.js";

export class RedisCacheService implements ICache {
    constructor(
        private readonly connection: RedisConnection,
        private readonly config: RedisConfig
    ) { }

    private k(key: string): string {
        return this.config.keyPrefix + key
    }

    private withJitter(ttl: number): number {
        return Math.floor(ttl * (1 + Math.random() * 0.1))
    }

    async get<T>(key: string): Promise<T | null> {
        try {
            const raw = await this.connection.getClient().get(this.k(key))
            return raw ? (JSON.parse(raw) as T) : null
        } catch (error) {
            console.error(`[Cache] get lỗi (${key}):`, (error as Error).message);
            return null;
        }
    }

    async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
        try {
            const ttl = this.withJitter(ttlSeconds ?? this.config.defaultTtl)
            await this.connection.getClient().set(this.k(key), JSON.stringify(value), { EX: ttl })
        } catch (error) {
            console.error(`[Cache] set lỗi (${key}):`, (error as Error).message);
        }
    }

    async del(...keys: string[]): Promise<void> {
        try {
            await this.connection.getClient().del(keys.map((k) => this.k(k)))
        } catch (error) {
            console.error("[Cache] del lỗi:", (error as Error).message);
        }
    }

    async remember<T>(key: string, loader: () => Promise<T | null>, ttlSeconds?: number): Promise<T | null> {
        const cached = await this.get<T>(key)
        if (cached !== null) return cached

        const fresh = await loader()
        if (fresh !== null && fresh !== undefined) {
            await this.set<T>(key, fresh, ttlSeconds)
        }
        return fresh
    }


}
