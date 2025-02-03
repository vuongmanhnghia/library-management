from fastapi import HTTPException
from datetime import datetime
from app.configs.database import posts, users
from app.models.post import Post, CreatePost
from app.schemas.post_schemas import  detail_post
from fastapi.encoders import jsonable_encoder
from bson import ObjectId

async def get_all_posts(query_params):
    page = int(query_params.get("page", 1))
    per_page = int(query_params.get("per_page", 10))
    skip = (page - 1) * per_page
    
    try:
        total_posts = await posts.count_documents({})
        posts_cursor = posts.find({}).skip(skip).limit(per_page).sort("created_at", -1)  
        raw_posts = await posts_cursor.to_list(length=per_page)
        list_posts = []
        for post in raw_posts:
            post["_id"] = str(post["_id"])  
            list_posts.append(detail_post(post))
        
        return {
            "posts": list_posts,
            "page": page,
            "per_page": per_page,
            "total_posts": total_posts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def create_post(user, post):
    now = datetime.utcnow()

    post_dict = post.dict(by_alias=True)
    post_dict.pop("_id", None)
    post_dict["created_at"] = now
    post_dict["updated_at"] = now
    post_dict["user_id"] = str(user["_id"])

    try:
        post_dict["full_name"] = str(user["full_name"])
        post_dict["role"] = str(user["role"])
        result = await posts.insert_one(post_dict)
        post_dict["_id"] = str(result.inserted_id)

        return detail_post(post_dict)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
