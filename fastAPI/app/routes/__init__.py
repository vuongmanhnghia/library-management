from fastapi import APIRouter  # type: ignore

router = APIRouter()

# from .user_router import userRouter
from .book_router import bookRouter


@router.get("/")
async def index():
    return {"message": "Hello FastAPI"}


# router.include_router(userRouter, prefix="/users", tags=["users"])
router.include_router(bookRouter, prefix="/books", tags=["books"])
