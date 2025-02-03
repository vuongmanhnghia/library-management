from fastapi import Request, APIRouter, Depends
from app.middleware.require_authentication import require_authentication
from app.configs.database import posts
from app.models.post import CreatePost
from app.services import post_service
from bson import ObjectId


postRouter = APIRouter()


# Lấy danh sách sách (phân trang)
@postRouter.get("/", dependencies=[Depends(require_authentication)])
async def read_root(request: Request):
    return await post_service.get_all_posts(request.query_params)

@postRouter.post("/", dependencies=[Depends(require_authentication)])
async def create_post(request: Request, post: CreatePost):
    return await post_service.create_post(request.current_user, post)