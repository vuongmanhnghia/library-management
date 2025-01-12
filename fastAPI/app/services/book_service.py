from fastapi import HTTPException
from datetime import datetime
from app.configs.database import books
from app.models.book import Book


# Lấy danh sách sách có phân trang
async def read_root(query_params):
    page = int(query_params.get("page", 1))
    per_page = int(query_params.get("per_page", 10))
    skip = (page - 1) * per_page

    try:
        books_cursor = books.find().skip(skip).limit(per_page)
        raw_books = await books_cursor.to_list(length=per_page)

        # Chuyển đổi sang đối tượng Pydantic
        list_books = []
        for book in raw_books:
            book["_id"] = str(book["_id"])  # Chuyển ObjectId sang chuỗi
            book["created_at"] = book["created_at"]
            book["updated_at"] = book["updated_at"]
            list_books.append(Book(**book))

        return {
            "books": [book.dict(by_alias=True) for book in list_books],
            "page": page,
            "per_page": per_page,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def create_book(book):
    now = datetime.utcnow()
    book = book.dict(by_alias=True)  # Lấy dữ liệu từ Pydantic Model
    book.pop("_id", None)  # Loại bỏ id vì MongoDB tự tạo
    book["created_at"] = now
    book["updated_at"] = now

    try:
        result = await books.insert_one(book)
        book["_id"] = str(result.inserted_id)  # Chuyển ObjectId sang chuỗi
        return Book(**book)  # Trả về đối tượng Pydantic
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
