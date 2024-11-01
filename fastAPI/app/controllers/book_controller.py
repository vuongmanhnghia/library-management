from app.configs.database import books
from app.schemas import book_schemas
from bson import ObjectId  # type: ignore


def get_all_books():
    list_books = book_schemas.list_book(books.find())
    return {"data": list_books}


def create_book(book):
    book = dict(book)
    books.insert_one(book)
    return {"data": book_schemas.detail_book(book)}


def update_book(id, book):
    book = dict(book)
    books.update_one({"_id": ObjectId(id)}, {"$set": book})
    return {"data": book_schemas.detail_book(book)}
