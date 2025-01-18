from fastapi import APIRouter, Request, Depends
from app.controllers import book_controller
from app.middleware.require_authentication import require_authentication

userRouter = APIRouter()


@userRouter.get("/my-books", dependencies=[Depends(require_authentication)])
async def read_my_books(request: Request):
    print("user_router.py")
    return await book_controller.read_my_books(request)
