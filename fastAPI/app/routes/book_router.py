from fastapi import APIRouter, Request, Depends
from app.controllers import book_controller
from app.middleware.require_authentication import require_authentication
from app.models.book import BookCreate, BookUpdate

bookRouter = APIRouter()


@bookRouter.get("my-books", dependencies=[Depends(require_authentication)])
async def read_my_books(request: Request):
    return await book_controller.read_my_books(request)


# Lấy danh sách sách (phân trang)


# Cập nhật sách theo ID
@bookRouter.put("/{id}", dependencies=[Depends(require_authentication)])
async def update_book(id: str, book: BookUpdate):
    return await book_controller.update_book(id, book)


# Xóa sách theo ID
@bookRouter.delete("/{id}", dependencies=[Depends(require_authentication)])
async def delete_book(request: Request, id: str):
    return await book_controller.delete_book(request, id)


# Tạo mới sách
@bookRouter.post("/", dependencies=[Depends(require_authentication)])
async def create_book(request: Request, book: BookCreate):
    return await book_controller.create_book(request, book)


@bookRouter.get("/", dependencies=[Depends(require_authentication)])
async def read_root(request: Request):
    return await book_controller.read_root(request.query_params)


@bookRouter.get("/{id}", dependencies=[Depends(require_authentication)])
async def read_book_by_id(request: Request, id: str):
    return await book_controller.read_book_by_id(request, id)
