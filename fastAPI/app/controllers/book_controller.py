from fastapi import HTTPException, Query
from app.configs.database import books
from bson import ObjectId
from app.services import book_service
from app.schemas import book_schemas


# Lấy danh sách sách
async def read_root(query_params):
    list_books = await book_service.read_root(query_params)
    return {"status": 200, "success": True, "message": "OK", "data": list_books}


# Tạo sách mới
async def create_book(request, book):
    result = await book_service.create_book(request.current_user, book)
    return {
        "status": 201,
        "success": True,
        "message": "Create new book success!",
        "data": result,
    }


# Cập nhật sách theo ID
async def update_book(id, book):
    book = dict(book)
    result = await books.update_one(
        {"_id": ObjectId(id)}, {"$set": book}
    )  # Async update
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    book["_id"] = id  # Đảm bảo thêm ID vào kết quả trả về
    return {"data": book_schemas.detail_book(book)}


# Xem chi tiết sách theo ID
async def read_book_by_id(request, id):
    result = await book_service.read_book_by_id(request.current_user, id)
    return {"status": 200, "success": True, "message": "OK", "data": result}


# Xóa sách theo ID
async def delete_book(request, id):
    result = await book_service.delete_book(request.current_user, id)
    return {
        "status": 200,
        "success": True,
        "message": "Delete book success!",
        "data": result,
    }


async def read_my_books(request):
    list_books = await book_service.read_my_books(request.current_user)
    return {"status": 200, "success": True, "message": "OK", "data": list_books}
