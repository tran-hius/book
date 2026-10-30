import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/error.handler.js";

export const errorMiddlewares: ErrorRequestHandler = (
    err, req, res, next
) => {
    console.error("🔥 Lỗi chi tiết tại ErrorMiddleware:", err);

    let statusCode: number;
    let message: string;
    if (err instanceof AppError) {
        message = err.message;
        statusCode = err.statusCode;
    } else {
        statusCode = 500;
        message = "Lỗi máy chủ nội bộ";
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV !== "production" && {
            debug: err instanceof Error ? err.message : String(err),
            stack: err instanceof Error ? err.stack : undefined,
        }),
    });
};
