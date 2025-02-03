def detail_comment(comment) -> dict:
    return {
        "id": str(comment["_id"]),
        "post_id": str(comment["post_id"]),
        "user_id": str(comment["user_id"]),
        "content": comment["content"],
        "full_name": comment["full_name"],
        "role": comment["role"],
        "created_at": comment["created_at"],
        "updated_at": comment["updated_at"],
    }
    
def list_comments(comments) -> list:
    return [detail_comment(comment) for comment in comments]