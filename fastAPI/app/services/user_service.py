from fastapi import HTTPException
from app.configs.database import users, books, posts
from app.schemas.user_schemas import details_user

async def get_user_by_email(email: str):
    user = await users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.get("role") == "admin":
        raise HTTPException(status_code=403, detail="Forbidden: Admins cannot access other admins' details")
    
    user_id = str(user["_id"])
    created_at = user["created_at"]
    updated_at = user["updated_at"]
    
    return {
        "user_id": user_id,
        "created_at": created_at,
        "updated_at": updated_at,
        "user_details": details_user(user)
    }
    
async def get_all_users(query_params):
    page = int(query_params.get("page", 1))
    per_page = int(query_params.get("per_page", 10))
    skip = (page - 1) * per_page

    try:
        total_users = await users.count_documents({})
        users_cursor = users.find({"role": "user"}).skip(skip).limit(per_page)
        raw_users = await users_cursor.to_list(length=per_page)

        # Chuyển đổi sang đối tượng Pydantic
        list_users = []
        for user in raw_users:
            user["_id"] = str(user["_id"])  # Chuyển ObjectId sang chuỗi
            list_users.append(details_user(user))

        return {
            "users": list_users,
            "page": page,
            "per_page": per_page,
            "total_users": total_users
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
async def get_dashboard_data():
    try:
        total_users = await users.count_documents({})
        total_books = await books.count_documents({})
        total_posts = await posts.count_documents({})
        pending_books = await books.count_documents({"status": "false"})

        user_list = await users.find({}, {"_id": 1, "avatar": 1, "full_name": 1, "email": 1}).sort("created_at", -1).to_list(5)
        user_list = [{"id": str(user["_id"]), "full_name": user["full_name"], "email": user["email"]} for user in user_list]

        book_list = await books.find({}, {"_id": 1, "title": 1, "author": 1}).sort("created_at", -1).to_list(3)
        book_list = [{"id": str(book["_id"]), "title": book["title"], "author": book["author"]} for book in book_list]

        return {
            "total_users": total_users,
            "total_books": total_books,
            "total_posts": total_posts,
            "pending_books": pending_books,
            "users": user_list,
            "books": book_list,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

