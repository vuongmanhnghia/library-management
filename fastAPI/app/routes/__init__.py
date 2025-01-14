from fastapi import APIRouter  # type: ignore

router = APIRouter()

# from .user_router import userRouter
from .book_router import bookRouter
from .auth_router import authRouter


@router.get("/")
async def index():
    return {"message": "Hello FastAPI"}


router.include_router(authRouter, prefix="/auth", tags=["auth"])
router.include_router(bookRouter, prefix="/books", tags=["books"])
