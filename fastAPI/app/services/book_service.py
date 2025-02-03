from fastapi import HTTPException
from datetime import datetime
from app.configs.database import books
from app.models.book import Book
from app.schemas.book_schemas import detail_book
from bson import ObjectId

async def read_root(query_params):
    page = int(query_params.get("page", 1))
    per_page = int(query_params.get("per_page", 10))
    skip = (page - 1) * per_page

    try:
        total_books = await books.count_documents({"status": "true"})
        books_cursor = books.find({"status": "true"}).skip(skip).limit(per_page)
        raw_books = await books_cursor.to_list(length=per_page)
        
        list_books = []
        for book in raw_books:
            book["_id"] = str(book["_id"])  
            book["user_id"] = str(book["user_id"])
            list_books.append(detail_book(book))
        return {
            "books": list_books,
            "page": page,
            "per_page": per_page,
            "total_books": total_books
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def create_book(user, book):
    now = datetime.utcnow()
    book = book.dict(by_alias=True)  
    book.pop("_id", None)  
    book["user_id"] = user["_id"]  
    book["created_at"] = now
    book["updated_at"] = now
    try:
        result = await books.insert_one(book)
        book["_id"] = str(result.inserted_id)  
        book["user_id"] = str(book["user_id"])  
        return detail_book(book)  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def read_book_by_id(user, id: str):
    try:
        book = await books.find_one({"_id": ObjectId(id)})
        if book:
            book["_id"] = str(book["_id"])  
            book["user_id"] = str(book["user_id"])
            book["created_at"] = book["created_at"]
            book["updated_at"] = book["updated_at"]
            return detail_book(book)
        raise HTTPException(status_code=404, detail="Book not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def update_book(user, id, book):
    update_fields = {key: value for key, value in book.items() if value is not None}
    if not update_fields:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await books.update_one(
        {"_id": ObjectId(id), "user_id": user["_id"]}, {"$set": update_fields}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")

    book = await books.find_one({"_id": ObjectId(id), "user_id": user["_id"]})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found after update")
    print(book)

    book["_id"] = str(book["_id"])
    book["user_id"] = str(book["user_id"])
    return detail_book(book)


async def delete_book(user, id):
    try:
        
        query = {"_id": ObjectId(id)}
        if user["role"] != "admin":
            query["user_id"] = user["_id"]

        result = await books.delete_one(query)

        if result.deleted_count:
            return {"_id": id}
        else:
            raise HTTPException(status_code=404, detail="Book not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def read_my_books(user):
    try:
        books_cursor = books.find({"user_id": user["_id"]})
        raw_books = await books_cursor.to_list(length=10)

        
        list_books = []
        for book in raw_books:
            book["_id"] = str(book["_id"])  
            book["user_id"] = str(book["user_id"])
            book["created_at"] = book["created_at"]
            book["updated_at"] = book["updated_at"]
            list_books.append(detail_book(book))

        return list_books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def update_book_status(id: str):
    book = await books.find_one({"_id": ObjectId(id)})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    new_status = "false" if book["status"] == "true" else "true"

    await books.update_one({"_id": ObjectId(id)}, {"$set": {"status": new_status, "updated_at": datetime.utcnow()}})

    return {"id": id, "status": new_status}

async def get_pending_books():
    try:
        books_cursor = books.find({"status": "false"})  
        raw_books = await books_cursor.to_list(length=None)

        list_books = []
        for book in raw_books:
            book["_id"] = str(book["_id"])  
            book["user_id"] = str(book["user_id"]) if "user_id" in book else None
            list_books.append(detail_book(book))

        return list_books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
