import express from "express";
import type { BookController } from "../controllers/book.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
    createBookSchema,
    updateBookSchema,
} from "../dtos/book.js";

export function bookRouter(bookController: BookController) {
    const router = express.Router();

    router.post(
        "/books",
        validate(createBookSchema),
        bookController.createOrIncrease.bind(bookController)
    );

    router.get(
        "/books",
        bookController.getAll.bind(bookController)
    );

    router.get(
        "/books/:id",
        bookController.getById.bind(bookController)
    );


    router.patch(
        "/books/:id",
        validate(updateBookSchema),
        bookController.updateBook.bind(bookController)
    );

    router.delete(
        "/books/:id",
        bookController.deleteBook.bind(bookController)
    );

    return router;
}
