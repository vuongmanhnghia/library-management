# Library Management

## Team: Chivas

-  Mentor: Kiều Hồng Phong

## Danh sách thành viên:

-  Trần Quốc Cường
-  Vương Mạnh Nghĩa
-  Phạm Bá Tiến
-  Hoàng Thị Ngọc Linh
-  Lê Hoàng Anh

## Giới thiệu

Dự án "Library Management" nhằm phát triển một hệ thống thư viện điện tử hiện đại, hỗ trợ tối ưu quá trình tra cứu tài liệu và phục vụ nhu cầu học tập. Hệ thống giúp người dùng dễ dàng tiếp cận tài nguyên học thuật của tổ chức, đồng thời cải thiện quy trình quản lý và cập nhật tài liệu của thư viện. Với "Library Management", hệ thống thư viện sẽ được nâng cấp, góp phần tạo ra môi trường học tập hiệu quả và phù hợp với xu hướng chuyển đổi số trong giáo dục hiện nay.

## Tính năng chính

-  Tra cứu tài liệu: Cho phép người dùng tìm kiếm tài liệu qua từ khóa, chủ đề, hoặc tên tác giả.
-  Đăng tải tài liệu/ duyệt tài liệu: Cho phép giảng viên/ sinh viên đăng tải mới tài liệu thông qua kiểm duyệt của admin.
-  Quản lí mượn sách và trả sách: Người dùng có thể đăng ký mượn sách và kiểm tra thời gian mượn hoặc gia hạn sách online.
-  Tài liệu điện tử: Cung cấp tài liệu số hóa để người dùng có thể đọc online hoặc tải xuống.

## Tính năng mới

-  Trợ lý ảo thông minh: Giải đáp những thắc mắc cơ bản của sinh viên về thư viện.
-  Thông báo nhắc nhở: Tự động gửi thông báo về hạn trả sách, tài liệu mới, và các sự kiện của thư viện.

## Cài đặt và chạy dự án

-  Clone project

### Backend

```bash
cd fastAPI
```

1. Cài đặt môi trường ảo (Hãy chắc chắn rằng bạn đã cài python trên máy)

```bash
python -m venv venv
```

2. Create `.env` file và copy content trong file `.env.example` đến file `.env` và config các biến môi trường

3. Select Interpreter

```bash
venv\Scripts\activate
```

4. Cài đặt các thư viện cần thiết

```bash
pip install -r requirements.txt
```

5. Chạy dự án

```bash
uvicorn app.main:app --reload
```

<!-- ### Frontend -->

<!-- cd reactjs -->
