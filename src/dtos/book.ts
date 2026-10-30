import { z } from "zod/v3";
import { parseDateDMY } from "../utils/format.date.js";

const dateSchema = z.string({
    required_error: "Ngày phát hành là bắt buộc",
    invalid_type_error: "Ngày phát hành phải là chuỗi ký tự",
}).transform((value, ctx) => {
    const date = parseDateDMY(value);

    if (!date) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Ngày phát hành phải là ngày hợp lệ theo định dạng DD-MM-YYYY",
        });

        return z.NEVER;
    }

    return date;
});

export const createBookSchema = z.object({
    title: z.string({
        required_error: "Tiêu đề sách là bắt buộc",
        invalid_type_error: "Tiêu đề sách phải là chuỗi ký tự",
    })
    .trim()
    .min(1, "Tiêu đề sách không được để trống")
    .max(255, "Tiêu đề sách không được vượt quá 255 ký tự"),

    author: z.string({
        required_error: "Tên tác giả là bắt buộc",
        invalid_type_error: "Tên tác giả phải là chuỗi ký tự",
    })
    .trim()
    .min(1, "Tên tác giả không được để trống")
    .max(255, "Tên tác giả không được vượt quá 255 ký tự"),

    publisher: z.string({
        invalid_type_error: "Nhà xuất bản phải là chuỗi ký tự",
    })
    .trim()
    .min(1, "Nhà xuất bản không được để trống")
    .max(255, "Nhà xuất bản không được vượt quá 255 ký tự")
    .optional(),

    publishDate: dateSchema,

    genre: z.string({
        required_error: "Thể loại sách là bắt buộc",
        invalid_type_error: "Thể loại sách phải là chuỗi ký tự",
    })
    .trim()
    .min(1, "Thể loại sách không được để trống")
    .max(100, "Thể loại sách không được vượt quá 100 ký tự"),

    description: z.string({
        invalid_type_error: "Mô tả sách phải là chuỗi ký tự",
    })
    .trim()
    .min(1, "Mô tả sách không được để trống")
    .optional(),

    price: z.number({
        required_error: "Giá sách là bắt buộc",
        invalid_type_error: "Giá sách phải là số",
    })
    .finite("Giá sách phải là số hữu hạn")
    .min(0, "Giá sách không được âm"),

    stock: z.number({
        invalid_type_error: "Số lượng tồn kho phải là số",
    })
    .int("Số lượng tồn kho phải là số nguyên")
    .min(0, "Số lượng tồn kho không được âm")
    .default(1),

    coverImageUrl: z.string({
        invalid_type_error: "Đường dẫn ảnh bìa phải là chuỗi ký tự",
    })
    .trim()
    .url("Đường dẫn ảnh bìa không đúng định dạng URL")
    .max(255, "Đường dẫn ảnh bìa không được vượt quá 255 ký tự")
    .optional(),
}).strict();

export const updateBookSchema = createBookSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        { message: "Phải cung cấp ít nhất một trường dữ liệu để cập nhật" },
    );

export interface BookResponseDTO {
    id: number;
    title: string;
    author: string;
    publisher?: string;
    publish_date: Date | string;
    genre: string;
    description?: string;
    price: number;
    stock: number;
    cover_image_url?: string;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface PaginatedBooksDTO {
    books: BookResponseDTO[];
    total: number;
}

export type CreateBookDTO = z.output<typeof createBookSchema>;
export type UpdateBookDTO = z.output<typeof updateBookSchema>;
