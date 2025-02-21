# **Team CHIVAS**: dự án Libary Forum

## **1. Mentor**
-  Mentor: Kiều Hồng Phong

## **2. Thành viên nhóm**

1. **Trần Quốc Cường** (Leader)
   - Vai trò: Frontend + UX/UI 
2. **Vương Mạnh Nghĩa**
   - Vai trò: Backend + database
3. **Phạm Bá Tiến**
   - Vai trò: ...
4. **Hoàng Thị Ngọc Linh**
   - Vai trò: ...
5. **Lê Hoàng Anh**
   - Vai trò: ...

---
## **3. Ý tưởng:**
- Tìm kiếm và khám phá sách nhanh chóng.
- Chia sẻ và tương tác cộng đồng.
- Kết nối qua hệ thống mạng xã hội.
- Quản lý người dùng hiệu quả.
- Tích hợp trợ ý AI vào dự án.

## **4. Đề tài:**
Dự án **Library Forum** cho phép:
### Chức Năng Quản Lý Hệ Thống

#### a. Quản lý người dùng
- Đăng ký, đăng nhập, xóa tài khoản
- Quản lý vai trò: Người dùng có các vai trò như Admin và User.
- Hồ sơ cá nhân: Cho phép người dùng cập nhật thông tin, avatar.

#### b. Quản lý đăng sách
- Hệ thống chia sẻ sách lên như 1 diễn đàn.
- Chức năng chính:Đăng sách, sửa sách, xóa sách.
- Chức năng phụ: Like và chia sẻ sách.
- Xem chi tiết sách.
- Đánh giá sao, feedback (đang phát triển).

#### c. Diễn đàn 
- Đăng bài: Đăng bài thảo luận các vấn đề liên quan đến sách.
- Bình luận: Bình luận các bài của người khác đăng.
- Chia sẻ bài: Chia sẻ bài đăng. (đang phát triển)

#### d. Tìm kiếm và phân loại
- Tìm kiếm toàn văn: Hỗ trợ tìm kiếm nhanh bằng tiêu đề, nội dung hoặc tag.
- Lọc nội dung: Lọc bài viết theo tiêu đề sách và ngày xuất bản.

#### e. Trợ lý AI *(đang phát triển)*
- Trả lời những câu hỏi về sản phẩm.


## **5. Hướng dẫn cài đặt**
### Cài đặt và chạy dự án
### **5.0 Anh chị có thể chạy dự án tại: https://library-forum.onrender.com/

### **5.1 Clone project**
1. Clone dự án
```bash
git clone <link_git_repo>
cd <thư_mục_dự_án>
```
### **⚠️ Lưu ý chạy Frontend và Backend ở 2 terminal khác nhau để dự án hoạt động. ⚠️**

### **Cài đặt Backend**
1. Từ thư mục gốc của dự án

```bash
cd fastAPI
```

2. Cài đặt môi trường ảo (Hãy chắc chắn rằng bạn đã cài python trên máy)

```bash
python -m venv venv
```

3. Create `.env` file và copy content trong file `.env.example` đến file `.env` và config các biến môi trường

4. Select Interpreter

```bash
venv\Scripts\activate
```

5. Cài đặt các thư viện cần thiết

```bash
pip install -r requirements.txt
```

6. Chạy dự án

```bash
uvicorn app.main:app --reload
```

### **Cài đặt Frontend**
1.- Từ thư mục gốc của dự án

```bash
cd libary
```

2. Cài đặt thư viện 
```bash
npm install
```

3. Tạo file `.env` cùng cấp với `\src` và `\public` và thiết lập các biến như trong `.env.example`

4. Chạy dự án 
```bash
npm start 
```

### Cài đặt các thư viện bổ sung (nếu có)
- Từ thư mục gốc dự án điều hướng đến file
```bash
cd libary
```
- React Router Dom (quản lý điều hướng):
```bash
npm install react-router-dom
```
- Axios (gọi API):
```bash
npm install axios
```
- SCSS (quản lý style):
```bash
npm install sass
```


## **6. Nguồn Tham Khảo**
- [Ant Design](https://ant.design)
- [EmailJS](https://www.emailjs.com)
- [Redux](https://redux-toolkit.js.org/)
- [DayJS](https://day.js.org/)
- [Redux-persist](https://github.com/rt2zz/redux-persist)
- Chat GPT
- [Slink PTIT](slink.ptit.edu.vn)
- [FastAPI](https://fastapi.tiangolo.com/)

<!-- cd reactjs -->
