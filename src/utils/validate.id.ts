import { AppError } from "./error.handler.js";

export function validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("ID sách không hợp lệ", 400);
    }
}
