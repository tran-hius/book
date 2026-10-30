import type { RequestHandler } from "express";
import type { ZodTypeAny } from "zod/v3";

export const validate = (schema: ZodTypeAny): RequestHandler => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Dữ liệu không hợp lệ",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join(".") || "body",
                    message: issue.message,
                })),
            });
        }

        req.body = result.data;

        next();
    };
};
