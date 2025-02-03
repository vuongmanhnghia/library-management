def detail_post(post):
    return {
        "id": str(post["_id"]),  # Chuyển ObjectId thành chuỗi
        "content": post["content"],
        "image": post["image"],
        "full_name": post["full_name"],
        "role": post["role"],
        "user_id": str(post["user_id"]), 
        "created_at": post["created_at"],
        "updated_at": post["updated_at"],
    }

def list_post(post) -> dict:
    return [detail_post(post) for post in post]
