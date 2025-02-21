from fastAPI import Request
from app.configs.database import posts
from app.models.post import CreatePost
from app.services import post_service

async def get_all_posts(request: Request):
    list_posts = await post_service.get_all_posts(request)
    return {"status": 200, "success": True, "message": "OK", "data": list_posts}

async def create_post(request: Request, post: CreatePost):
    result = await post_service.create_post(request.current_user, post)
    return {
        "status": 201,
        "success": True,
        "message": "Create new post success!",
        "data": result,
    }