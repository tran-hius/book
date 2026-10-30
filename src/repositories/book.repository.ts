import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Book } from "../models/book.js";
import { CreateBookDTO, UpdateBookDTO } from "../dtos/book.js";

export interface PaginatedBooksResult {
    books: Book[];
    total: number;
}

export class BookRepository {
    constructor(private readonly db: Pool) {

    }

    async getById(id: number): Promise<Book | null> {
        const sql = "SELECT * FROM books WHERE id = ?"
        const [rows] = await this.db.execute<RowDataPacket[]>(sql, [id])
        if (rows.length === 0) {
            return null
        }
        const result = rows[0]
        return Book.toObject(result)
    }

    async getAll(page: number, limit: number): Promise<PaginatedBooksResult> {
        const skip = (page - 1) * limit
        const [rows] = await this.db.execute<RowDataPacket[]>(`SELECT * FROM books ORDER BY id DESC LIMIT ? OFFSET ?`, [limit, skip])
        const [countRows] = await this.db.execute<RowDataPacket[]>(`SELECT COUNT(*) AS total FROM books`)
        return {
            books: rows.map((row) => Book.toObject(row)),
            total: Number(countRows[0].total),
        }
    }

    async createOrIncreaseStock(data: CreateBookDTO): Promise<{ id: number, isNew: boolean }> {
        const sql = `INSERT INTO books
                    (title, author, publisher, publish_date, genre, description, price, stock, cover_image_url)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE stock = stock + VALUES(stock), id = LAST_INSERT_ID(id)`
        const values = [
            data.title,
            data.author,
            data.publisher ?? null,
            data.publishDate ?? null,
            data.genre,
            data.description ?? null,
            data.price,
            data.stock ?? 1,
            data.coverImageUrl ?? null,
        ];

        const [result] = await this.db.execute<ResultSetHeader>(sql, values);

        return {
            id: result.insertId,
            isNew: result.affectedRows === 1,
        };

    }


    async update(id: number, data: UpdateBookDTO): Promise<boolean> {
        const entries = Object.entries(data)
        if (entries.length === 0) {
            return false
        }
        const clause = entries.map(([key]) => `${this.toColumn(key)} = ?`).join(", ")
        const values = entries.map(([, value]) => value)
        const [result] = await this.db.execute<ResultSetHeader>(`UPDATE books SET ${clause} WHERE id = ?`, [...values, id])
        return result.affectedRows > 0;
    }

    private toColumn(key: string): string {
        const columns: Record<string, string> = {
            title: "title",
            author: "author",
            publisher: "publisher",
            publishDate: "publish_date",
            genre: "genre",
            description: "description",
            price: "price",
            stock: "stock",
            coverImageUrl: "cover_image_url"
        };

        return columns[key] ?? key;
    }



    async delete(id: number): Promise<boolean> {
        const [result] = await this.db.execute<ResultSetHeader>(
            "DELETE FROM books WHERE id = ?",
            [id]
        );

        return result.affectedRows > 0;
    }


}
