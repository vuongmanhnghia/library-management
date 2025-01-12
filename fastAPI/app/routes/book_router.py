from fastapi import APIRouter, Request
from app.controllers import book_controller

from app.models.book import BookCreate, BookUpdate

bookRouter = APIRouter()


# Lấy danh sách sách (phân trang)
@bookRouter.get("/")
async def read_root(request: Request):
    return await book_controller.read_root(request.query_params)


# Tạo mới sách
@bookRouter.post("/")
async def create_book(book: BookCreate):
    return await book_controller.create_book(book)


# # Cập nhật sách theo ID
# @bookRouter.put("/{id}")
# async def update_book(id: str, book: BookUpdate):
#     return await book_controller.update_book(id, book)
