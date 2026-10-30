import { createClient } from "redis";
import { RedisConfig } from "../interfaces/redis.interface.js";

export type RedisClient = ReturnType<typeof createClient>

export class RedisConnection {
    private readonly client: RedisClient

    constructor(private readonly config: RedisConfig) {
        this.client = createClient({
            socket: {
                host: config.host,
                port: config.port,
                connectTimeout: 5000,
                reconnectStrategy: (retries) => {
                    if (retries > 20) {
                        return new Error("Redis: vượt quá số lần connection")
                    }

                    return Math.min(retries * 100 * 3000)
                }
            },
            password: config.password,
            database: config.db,
        })
        this.registerEvents()
    }

    private registerEvents(): void {
        this.client.on("connect", () => console.log("[Redis] đang kết nối..."));
        this.client.on("ready", () => console.log("[Redis] sẵn sàng"));
        this.client.on("reconnecting", () => console.warn("[Redis] đang reconnect..."));
        this.client.on("end", () => console.log("[Redis] đã đóng kết nối"));
        this.client.on("error", (err) => console.error("[Redis] lỗi:", err.message));
    }

    async disconnect(): Promise<void> {
        if (this.client.isOpen) {
            await this.client.quit();
        }
    }

    getClient(): RedisClient {
        return this.client;
    }

    isReady(): boolean {
        return this.client.isReady;
    }

    async ping(): Promise<boolean> {
        try {
            return (await this.client.ping()) === "PONG";
        } catch {
            return false;
        }
    }

}