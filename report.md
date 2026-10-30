# 📋 Bug Report & Code Review — Book CRUD

> Ngày đánh giá ban đầu: 2026-10-27  
> Cập nhật lần cuối: 2026-10-27 17:10

---

## 🎯 Bảng Tổng Kết Trạng Thái Toàn Bộ Codebase

| # | Hạng mục | Mức độ | Trạng thái | Chi tiết sau lần sửa mới nhất |
|---|----------|--------|------------|-------------------------------|
| 1 | Global Error Middleware | 🔴 Nghiêm trọng | ✅ **HOÀN HẢO** | Trả thông báo lỗi tiếng Việt: `"Lỗi máy chủ nội bộ"` |
| 2 | DI Container khởi tạo đúng thời điểm | 🔴 Nghiêm trọng | ✅ **HOÀN HẢO** | Chuyển sang factory `createContainer()` |
| 2.1 | Gắn router đúng cách trong `app.ts` | 🔴 Nghiêm trọng | ✅ **HOÀN HẢO** | `bookRouter(bookController)` đã được inject chuẩn xác |
| 3 | Database Connection Leak & Catch Error | 🟡 Cần sửa | ✅ **HOÀN HẢO** | `finally { connection.release() }` và re-throw lỗi chuẩn |
| 4 | Input Validation bằng Zod | 🟡 Cần sửa | ✅ **XUẤT SẮC** | Toàn bộ error messages của Zod đã được bản địa hoá 100% Tiếng Việt |
| 5 | Xoá import thừa (`title`) | 🟡 Cần sửa | ✅ **HOÀN THÀNH** | Đã xoá dòng import thừa trong `book.service.ts` |
| 6 | Singleton Database `private constructor` | 🟢 Tốt nhất nên có | ✅ **HOÀN THÀNH** | Constructor đã chuyển sang `private constructor()` |
| 7 | Định dạng ngày `DD-MM-YYYY` | 🟢 Tính năng | ✅ **HOÀN THÀNH** | Viết `src/utils/format.date.ts` kiểm tra lịch chuẩn xác |
| 8 | Chuẩn hoá RESTful API Routes | 🟢 Best Practice | ✅ **HOÀN THÀNH** | Sử dụng HTTP Verb định danh hành động thay vì RPC-style URL |
| 9 | API Danh sách Phân trang (`getAll`) | 🚀 Tính năng lớn | ✅ **HOÀN THÀNH** | Có `page`, `limit`, `total`, `totalPages`, map `Book.toObject` |
| 10 | Bản địa hoá Thông báo lỗi (Localization) | 🌐 Trải nghiệm | ✅ **HOÀN THÀNH** | 100% các câu thông báo phản hồi chuyển sang Tiếng Việt |

---

## 🌐 Danh Sách API Chuẩn RESTful Hoàn Chỉnh (`/api/v1`)

| STT | Hành động | HTTP Method | Endpoint | Query / Body | HTTP Status Trả Về | Mô tả |
|:---:|-----------|:-----------:|:---------|:------------|:------------------:|:------|
| 1 | **Create / Upsert** | `POST` | `/api/v1/books` | Body: `CreateBookDTO` | `201` / `200` | Tạo sách mới (201) hoặc tăng số lượng tồn kho nếu trùng sách (200) |
| 2 | **Get All (Pagination)** | `GET` | `/api/v1/books` | Query: `?page=1&limit=10` | `200` / `400` | Lấy danh sách sách phân trang (kèm `total`, `totalPages`) |
| 3 | **Get Detail** | `GET` | `/api/v1/books/:id` | Param: `:id` | `200` / `400` / `404` | Lấy thông tin chi tiết một cuốn sách theo ID |
| 4 | **Update** | `PATCH` | `/api/v1/books/:id` | Param: `:id`<br>Body: `UpdateBookDTO` | `200` / `400` / `404` / `409` | Cập nhật một hoặc nhiều trường thông tin của sách |
| 5 | **Delete** | `DELETE` | `/api/v1/books/:id` | Param: `:id` | `200` / `400` / `404` | Xoá cuốn sách khỏi hệ thống theo ID |

---

## 🇻🇳 Danh Mục Thông Báo Lỗi Tiếng Việt (Ví dụ mẫu phản hồi)

### 1. Lỗi Validate Form (400 Bad Request):
```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": [
    {
      "field": "title",
      "message": "Tiêu đề sách là bắt buộc"
    },
    {
      "field": "publishDate",
      "message": "Ngày phát hành phải là ngày hợp lệ theo định dạng DD-MM-YYYY"
    },
    {
      "field": "price",
      "message": "Giá sách không được âm"
    }
  ]
}
```

### 2. Lỗi Hệ Thống Không Mong Muốn (500 Internal Server Error):
```json
{
  "success": false,
  "message": "Lỗi máy chủ nội bộ"
}
```
