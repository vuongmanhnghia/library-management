from fastapi import APIRouter  # type: ignore
from app.models import Book
from app.controllers import book_controller
from bson import ObjectId  # type: ignore

bookRouter = APIRouter()


@bookRouter.get("/all-books")
async def get_all_books():
    return book_controller.get_all_books()


@bookRouter.post("/books")
async def create_book(book: Book):
    return book_controller.create_book(book)


@bookRouter.put("/books/{id}")
async def update_book(id: str, book: Book):
    return book_controller.update_book(id, book)
