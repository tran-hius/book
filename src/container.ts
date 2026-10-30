import { Database } from "./config/database.js";
import { loadDatabaseConfig } from "./config/database.config.js";
import { loadRedisConfig } from "./config/redis.config.js";
import { RedisConnection } from "./config/redis.js";
import { RedisCacheService } from "./cache/index.js";
import { BookController } from "./controllers/book.controller.js";
import { BookRepository } from "./repositories/book.repository.js";
import { BookService } from "./services/book.service.js";

export const createContainer = () => {
    const dbConfig = loadDatabaseConfig();
    const db = Database.getInstance(dbConfig);
    const pool = db.getPool();

    const redisConfig = loadRedisConfig();
    const redisConnection = new RedisConnection(redisConfig);
    const cacheService = new RedisCacheService(redisConnection, redisConfig);

    const bookRepository = new BookRepository(pool);
    const bookService = new BookService(bookRepository, cacheService);
    const bookController = new BookController(bookService);

    return {
        bookController,
        redisConnection,
    };
};
