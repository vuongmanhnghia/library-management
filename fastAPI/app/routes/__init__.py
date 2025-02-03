from fastapi import APIRouter  # type: ignore

router = APIRouter()

# from .user_router import userRouter
from .book_router import bookRouter
from .auth_router import authRouter
from .post_router import postRouter
from .user_router import userRouter
from .comment_router import commentRouter


@router.get("/")
async def index():
    return {"message": "Hello FastAPI"}


router.include_router(userRouter, prefix="/users", tags=["users"])
router.include_router(authRouter, prefix="/auth", tags=["auth"])
router.include_router(bookRouter, prefix="/books", tags=["books"])
router.include_router(postRouter, prefix="/posts", tags=["posts"])
router.include_router(commentRouter, prefix="/comments", tags=["comments"])
