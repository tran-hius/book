# Multi-stage build cho ứng dụng Node.js TypeScript
# Stage 1: Build mã nguồn TypeScript
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies manifest
COPY package*.json ./

# Cài đặt toàn bộ dependencies (bao gồm devDependencies để compile TS)
RUN npm ci

# Copy file cấu hình và source code
COPY tsconfig.json ./
COPY src ./src

# Biên dịch TypeScript sang JavaScript trong thư mục /dist
RUN npm run build

# Stage 2: Runtime image gọn nhẹ cho production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Chỉ cài đặt dependencies cần cho runtime
COPY package*.json ./
RUN npm ci --omit=dev

# Copy kết quả đã build từ builder stage
COPY --from=builder /app/dist ./dist

# Mở cổng ứng dụng
EXPOSE 3000

# Lệnh khởi chạy server
CMD ["node", "dist/main.js"]
