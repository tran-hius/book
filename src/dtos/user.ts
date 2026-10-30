import { z } from "zod/v3";
import { User } from "../models/user.js";

export const createUserSchema = z.object({
    username: z.string({
        required_error: "Tên đăng nhập là bắt buộc",
        invalid_type_error: "Tên đăng nhập phải là chuỗi ký tự",
    })
    .trim()
    .min(1, "Tên đăng nhập không được để trống")
    .max(100, "Tên đăng nhập không được vượt quá 100 ký tự"),

    email: z.string({
        required_error: "Email là bắt buộc",
        invalid_type_error: "Email phải là chuỗi ký tự",
    })
    .trim()
    .email("Email không đúng định dạng")
    .max(255, "Email không được vượt quá 255 ký tự"),

    password: z.string({
        required_error: "Mật khẩu là bắt buộc",
        invalid_type_error: "Mật khẩu phải là chuỗi ký tự",
    })
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(255, "Mật khẩu không được vượt quá 255 ký tự"),

    fullName: z.string({
        required_error: "Họ và tên là bắt buộc",
        invalid_type_error: "Họ và tên phải là chuỗi ký tự",
    })
    .trim()
    .min(1, "Họ và tên không được để trống")
    .max(255, "Họ và tên không được vượt quá 255 ký tự"),

    role: z.enum(["admin", "customer"], {
        invalid_type_error: "Vai trò phải là 'admin' hoặc 'customer'",
    })
    .default("customer"),

    phone: z.string({
        invalid_type_error: "Số điện thoại phải là chuỗi ký tự",
    })
    .trim()
    .min(1, "Số điện thoại không được để trống")
    .max(20, "Số điện thoại không được vượt quá 20 ký tự")
    .optional(),

    avatarUrl: z.string({
        invalid_type_error: "Đường dẫn ảnh đại diện phải là chuỗi ký tự",
    })
    .trim()
    .url("Đường dẫn ảnh đại diện không đúng định dạng URL")
    .max(255, "Đường dẫn ảnh đại diện không được vượt quá 255 ký tự")
    .optional(),
}).strict();

export const updateUserSchema = createUserSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        { message: "Phải cung cấp ít nhất một trường dữ liệu để cập nhật" },
    );

export interface PaginatedUsersDTO {
    users: User[];
    total: number;
}
export type CreateUserDTO = z.output<typeof createUserSchema>;
export type UpdateUserDTO = z.output<typeof updateUserSchema>;
