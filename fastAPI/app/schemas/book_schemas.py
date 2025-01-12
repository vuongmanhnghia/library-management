def detail_book(book) -> dict:
    return {
        "id": str(book["_id"]),
        "title": book["title"],
        "author": book["author"],
        # "description": book["description"],
        "published_date": book["published_date"],
        "introduction": book["introduction"],
        "cover": book["cover"],
        "file": book["file"],
        "created_at": book["created_at"],
    }


def list_book(books) -> list:
    return [detail_book(book) for book in books]
