import { BookResponseDTO, CreateBookDTO, PaginatedBooksDTO, UpdateBookDTO } from "../dtos/book.js";
import { BookRepository } from "../repositories/book.repository.js";
import { AppError } from "../utils/error.handler.js";
import { validateId } from "../utils/validate.id.js";
import { ICache } from "../cache/cache.interface.js";
import { CacheKeys } from "../cache/cache.keys.js";

export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly cache?: ICache
    ) { }

    async createOrIncrease(
        data: CreateBookDTO
    ): Promise<{ book: BookResponseDTO; isNew: boolean }> {
        if (data.price < 0) {
            throw new AppError("Giá sách không được âm", 400);
        }

        if (data.stock < 0 || !Number.isInteger(data.stock)) {
            throw new AppError(
                "Số lượng phải là số nguyên không âm",
                400
            );
        }

        const { id, isNew } =
            await this.bookRepository.createOrIncreaseStock(data);

        const book = await this.bookRepository.getById(id);

        if (!book) {
            throw new Error("Không đọc lại được sách vừa lưu");
        }

        if (this.cache) {
            await this.cache.del(CacheKeys.book(id));
        }

        return { book: book.toResponseDTO(), isNew };
    }

    async getAll(
        page: number,
        limit: number
    ): Promise<PaginatedBooksDTO> {
        if (!Number.isInteger(page) || page <= 0) {
            throw new AppError(
                "Page phải là số nguyên dương",
                400
            );
        }

        if (
            !Number.isInteger(limit) ||
            limit <= 0 ||
            limit > 100
        ) {
            throw new AppError(
                "Limit phải là số nguyên từ 1 đến 100",
                400
            );
        }

        if (!this.cache) {
            const data = await this.bookRepository.getAll(page, limit);
            return {
                books: data.books.map((b) => b.toResponseDTO()),
                total: data.total,
            };
        }

        const result = await this.cache.remember(
            CacheKeys.bookList(page, limit),
            async () => {
                const data = await this.bookRepository.getAll(page, limit);
                return {
                    books: data.books.map((b) => b.toResponseDTO()),
                    total: data.total,
                };
            },
            300
        );

        if (result === null) {
            throw new AppError("Không thể lấy danh sách sách", 500);
        }

        return result;
    }

    async getById(id: number): Promise<BookResponseDTO> {
        validateId(id);

        if (!this.cache) {
            const book = await this.bookRepository.getById(id);
            if (!book) {
                throw new AppError("Không tìm thấy sách này", 404);
            }
            return book.toResponseDTO();
        }

        const result = await this.cache.remember(CacheKeys.book(id), async () => {
            const book = await this.bookRepository.getById(id);
            if (!book) {
                throw new AppError("Không tìm thấy sách này", 404);
            }
            return book.toResponseDTO();
        });

        if (result === null) {
            throw new AppError("Không tìm thấy sách này", 404);
        }

        return result;
    }

    async updateBook(id: number, data: UpdateBookDTO): Promise<boolean> {
        validateId(id);

        await this.getById(id);

        if (data.stock !== undefined && data.stock < 0) {
            throw new AppError("Số lượng tồn không được âm", 400);
        }

        if (data.price !== undefined && data.price < 0) {
            throw new AppError("Giá tiền không được âm", 400);
        }

        const updated = await this.bookRepository.update(id, data);

        if (updated && this.cache) {
            await this.cache.del(CacheKeys.book(id));
        }

        return updated;
    }

    async deleteBook(id: number): Promise<boolean> {
        validateId(id);

        await this.getById(id);

        const deleted = await this.bookRepository.delete(id);

        if (deleted && this.cache) {
            await this.cache.del(CacheKeys.book(id));
        }

        return deleted;
    }
}
