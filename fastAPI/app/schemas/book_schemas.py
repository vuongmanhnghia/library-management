def detail_book(book) -> dict:
    return {
        "id": str(book["_id"]),
        "title": book["title"],
        # "author": book["author"],
        "description": book["description"],
        # "price": book["price"],
        # "rating": book["rating"],
        # "cover": book["cover"],
        # "created_at": book["created_at"],
    }


def list_book(books) -> list:
    return [detail_book(book) for book in books]
