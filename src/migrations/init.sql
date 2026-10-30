-- 1. Tạo database sử dụng UTF-8
CREATE DATABASE IF NOT EXISTS bookstore
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE bookstore;

-- 2. Tạo bảng books
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publisher VARCHAR(255),
    publish_date DATE,
    genre VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    cover_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_books_title_author_genre
        UNIQUE (title, author, genre)
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;


INSERT INTO books (
    title,
    author,
    publisher,
    publish_date,
    genre,
    description,
    price,
    stock,
    cover_image_url
)
VALUES
(
    'Nhật ký trong tù',
    'Hồ Chí Minh',
    'Nhà xuất bản Văn học',
    '2020-01-18',
    'Thơ ca',
    'Tập thơ được sáng tác trong thời gian Hồ Chí Minh bị giam giữ tại Trung Quốc.',
    90000.00,
    50,
    'https://example.com/images/nhat-ky-trong-tu.jpg'
),
(
    'Dế Mèn phiêu lưu ký',
    'Tô Hoài',
    'Nhà xuất bản Kim Đồng',
    '2021-05-15',
    'Thiếu nhi',
    'Câu chuyện phiêu lưu của chú Dế Mèn và những người bạn.',
    65000.00,
    35,
    'https://example.com/images/de-men-phieu-luu-ky.jpg'
),
(
    'Tắt đèn',
    'Ngô Tất Tố',
    'Nhà xuất bản Văn học',
    '2022-03-10',
    'Tiểu thuyết',
    'Tác phẩm phản ánh cuộc sống khốn khó của người nông dân Việt Nam.',
    78000.00,
    20,
    'https://example.com/images/tat-den.jpg'
),
(
    'Lão Hạc',
    'Nam Cao',
    'Nhà xuất bản Văn học',
    '2021-08-12',
    'Truyện ngắn',
    'Truyện ngắn nổi tiếng về số phận và phẩm giá của người nông dân.',
    45000.00,
    40,
    'https://example.com/images/lao-hac.jpg'
),
(
    'Số đỏ',
    'Vũ Trọng Phụng',
    'Nhà xuất bản Hội Nhà Văn',
    '2020-11-20',
    'Trào phúng',
    'Tiểu thuyết trào phúng về xã hội Việt Nam thời thuộc địa.',
    95000.00,
    18,
    'https://example.com/images/so-do.jpg'
),
(
    'Tuổi thơ dữ dội',
    'Phùng Quán',
    'Nhà xuất bản Kim Đồng',
    '2023-02-14',
    'Lịch sử',
    'Tác phẩm viết về những thiếu niên tham gia kháng chiến.',
    160000.00,
    25,
    'https://example.com/images/tuoi-tho-du-doi.jpg'
),
(
    'Cho tôi xin một vé đi tuổi thơ',
    'Nguyễn Nhật Ánh',
    'Nhà xuất bản Trẻ',
    '2022-06-01',
    'Văn học',
    'Câu chuyện gợi nhớ về tuổi thơ qua góc nhìn hài hước và sâu sắc.',
    85000.00,
    60,
    'https://example.com/images/ve-di-tuoi-tho.jpg'
),
(
    'Mắt biếc',
    'Nguyễn Nhật Ánh',
    'Nhà xuất bản Trẻ',
    '2021-09-05',
    'Tình cảm',
    'Câu chuyện về tình yêu đơn phương và những ký ức tuổi trẻ.',
    110000.00,
    30,
    'https://example.com/images/mat-biec.jpg'
),
(
    'Tôi thấy hoa vàng trên cỏ xanh',
    'Nguyễn Nhật Ánh',
    'Nhà xuất bản Trẻ',
    '2020-07-22',
    'Văn học',
    'Câu chuyện tuổi thơ ở một làng quê Việt Nam.',
    120000.00,
    45,
    'https://example.com/images/hoa-vang-co-xanh.jpg'
),
(
    'Cánh đồng bất tận',
    'Nguyễn Ngọc Tư',
    'Nhà xuất bản Trẻ',
    '2022-04-18',
    'Truyện ngắn',
    'Tập truyện khắc họa những phận người trên miền sông nước.',
    90000.00,
    15,
    'https://example.com/images/canh-dong-bat-tan.jpg'
),
(
    'Đắc nhân tâm',
    'Dale Carnegie',
    'Nhà xuất bản Tổng hợp TP.HCM',
    '2021-01-10',
    'Kỹ năng sống',
    'Sách về nghệ thuật giao tiếp và xây dựng các mối quan hệ.',
    86000.00,
    70,
    'https://example.com/images/dac-nhan-tam.jpg'
),
(
    'Nhà giả kim',
    'Paulo Coelho',
    'Nhà xuất bản Hội Nhà Văn',
    '2023-03-21',
    'Tiểu thuyết',
    'Hành trình theo đuổi ước mơ và khám phá ý nghĩa cuộc sống.',
    79000.00,
    55,
    'https://example.com/images/nha-gia-kim.jpg'
),
(
    'Không gia đình',
    'Hector Malot',
    'Nhà xuất bản Văn học',
    '2020-10-09',
    'Phiêu lưu',
    'Hành trình trưởng thành đầy thử thách của cậu bé Rémi.',
    125000.00,
    22,
    'https://example.com/images/khong-gia-dinh.jpg'
),
(
    'Sherlock Holmes',
    'Arthur Conan Doyle',
    'Nhà xuất bản Văn học',
    '2022-12-12',
    'Trinh thám',
    'Tuyển tập các vụ án nổi tiếng của thám tử Sherlock Holmes.',
    145000.00,
    32,
    'https://example.com/images/sherlock-holmes.jpg'
),
(
    'Mười người da đen nhỏ',
    'Agatha Christie',
    'Nhà xuất bản Trẻ',
    '2021-07-17',
    'Trinh thám',
    'Vụ án bí ẩn diễn ra trên một hòn đảo biệt lập.',
    98000.00,
    28,
    'https://example.com/images/muoi-nguoi-da-den-nho.jpg'
),
(
    'Clean Code',
    'Robert C. Martin',
    'Prentice Hall',
    '2020-09-01',
    'Lập trình',
    'Các nguyên tắc giúp viết mã nguồn sạch và dễ bảo trì.',
    650000.00,
    12,
    'https://example.com/images/clean-code.jpg'
),
(
    'The Pragmatic Programmer',
    'David Thomas',
    'Addison-Wesley',
    '2022-02-08',
    'Lập trình',
    'Kinh nghiệm và tư duy thực tiễn dành cho lập trình viên.',
    720000.00,
    10,
    'https://example.com/images/pragmatic-programmer.jpg'
),
(
    'Design Patterns',
    'Erich Gamma',
    'Addison-Wesley',
    '2021-04-19',
    'Kỹ thuật phần mềm',
    'Các mẫu thiết kế phổ biến trong phát triển phần mềm hướng đối tượng.',
    850000.00,
    8,
    'https://example.com/images/design-patterns.jpg'
),
(
    'You Don’t Know JS Yet',
    'Kyle Simpson',
    'O’Reilly Media',
    '2023-06-11',
    'JavaScript',
    'Khám phá sâu các khái niệm cốt lõi của JavaScript.',
    540000.00,
    16,
    'https://example.com/images/you-dont-know-js.jpg'
),
(
    'Fluent Python',
    'Luciano Ramalho',
    'O’Reilly Media',
    '2022-08-25',
    'Python',
    'Hướng dẫn sử dụng Python hiệu quả thông qua các tính năng ngôn ngữ.',
    890000.00,
    14,
    'https://example.com/images/fluent-python.jpg'
);