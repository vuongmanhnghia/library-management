from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException
from app.configs.database import posts, comments  # Định nghĩa collection comments trong database.py
from app.models.comment import CreateComment

async def create_comment(user, post_id: str, comment: CreateComment):
    now = datetime.utcnow()

    comment_dict = comment.dict(by_alias=True)
    comment_dict["_id"] = str(ObjectId())  
    comment_dict["created_at"] = now
    comment_dict["updated_at"] = now
    comment_dict["full_name"] = user.get("full_name", "Unknown")
    comment_dict["role"] = user.get("role", "User")
    comment_dict["user_id"] = str(user["_id"])
    comment_dict["post_id"] = str(post_id)  

    try:
        inserted_comment = await comments.insert_one(comment_dict)
        if not inserted_comment.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to create comment")

        return comment_dict 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
async def get_comments(post_id: str):
    try:
        comment_list = await comments.find({"post_id": str(post_id)}).to_list(None)

        for comment in comment_list:
            comment["_id"] = str(comment["_id"])

        return {"status": 200, "success": True, "data": comment_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
