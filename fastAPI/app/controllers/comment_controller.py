from fastAPI import HTTPException, Query, Request
from app.configs.database import comments
from app.models.comment import CreateComment
from app.services import post_service
from bson import ObjectId

async def create_comment(request: Request, post_id: str, comment: CreateComment):
    result = await post_service.create_comment(request.current_user, post_id, comment)
    return {
        "status": 201,
        "success": True,
        "message": "Create new comment success!",
        "data": result,
    }