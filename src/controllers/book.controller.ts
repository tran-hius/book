import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service.js";

export class BookController {
    constructor(private readonly bookService: BookService) {

    }

    async createOrIncrease(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { book, isNew } = await this.bookService.createOrIncrease(req.body)
            res.status(isNew ? 201 : 200).json(book)
        } catch (error) {
            next(error)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = Number(req.params.id);
            const book = await this.bookService.getById(id);
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const page = Number(req.query.page ?? 1);
            const limit = Number(req.query.limit ?? 10);

            const result = await this.bookService.getAll(page, limit);

            res.status(200).json({
                success: true,
                data: result.books,
                pagination: {
                    page,
                    limit,
                    total: result.total,
                    totalPages: Math.ceil(result.total / limit),
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async updateBook(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const id = Number(req.params.id);

            const result = await this.bookService.updateBook(
                id,
                req.body
            );

            if (!result) {
                res.status(409).json({
                    success: false,
                    message: "Không có thay đổi nào được thực hiện",
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Cập nhật sách thành công",
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteBook(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const id = Number(req.params.id);

            const result = await this.bookService.deleteBook(id);

            if (!result) {
                res.status(404).json({
                    success: false,
                    message: "Không tìm thấy sách cần xóa",
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Xóa sách thành công",
            });
        } catch (error) {
            next(error);
        }
    }

}