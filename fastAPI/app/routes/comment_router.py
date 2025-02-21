from fastapi import Request, APIRouter, Depends
from app.middleware.require_authentication import require_authentication
from app.models.comment import CreateComment
from app.services import comment_service


commentRouter = APIRouter()

# Tạo mới comment
@commentRouter.post("/{post_id}", dependencies=[Depends(require_authentication)])
async def create_comment_route(request: Request, post_id: str, comment: CreateComment):
    return await comment_service.create_comment(request.current_user, post_id, comment)

# Lấy danh sách comment theo post_id
@commentRouter.get("/{post_id}", dependencies=[Depends(require_authentication)])
async def get_comments_route(post_id: str):
    return await comment_service.get_comments(post_id)