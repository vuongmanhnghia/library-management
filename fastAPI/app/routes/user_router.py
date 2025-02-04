from fastapi import APIRouter, Request, Depends, HTTPException
from app.controllers import book_controller
from app.controllers import user_controller
from app.models.user import ReadUserByEmail
from app.middleware.require_authentication import require_authentication

userRouter = APIRouter()


@userRouter.get("/my-books", dependencies=[Depends(require_authentication)])
async def read_my_books(request: Request):
    print("user_router.py")
    return await book_controller.read_my_books(request)

@userRouter.post("/find-user-by-email", dependencies=[Depends(require_authentication)])
async def read_users(payload: ReadUserByEmail, request: Request):
    current_user = request.current_user
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden: Only admin can perform this action")
    
    result = await user_controller.get_user_by_email(payload.email)
    return {
        "status": 200,
        "success": True,
        "data": result
    }
    
@userRouter.get("/", dependencies=[Depends(require_authentication)])
async def get_all_users(request: Request):
    user = request.current_user
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admin can get all users")
    return await user_controller.get_all_users(request)

@userRouter.get("/dashboard", dependencies=[Depends(require_authentication)])
async def get_dashboard_data(request: Request):
    user = request.current_user
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admin can get dashboard data")
    return await user_controller.get_dashboard_data()
