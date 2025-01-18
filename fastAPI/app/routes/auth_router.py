from fastapi import APIRouter, Request, Depends
from app.controllers import auth_controller
from app.models.user import UserLogin, UserRegister, UserUpdate
from app.middleware.require_authentication import require_authentication

authRouter = APIRouter()


# Đăng ký tài khoản
@authRouter.post("/register")
async def register(user: UserRegister):
    return await auth_controller.register(user)


# Đăng nhập
@authRouter.post("/login")
async def login(user: UserLogin):
    return await auth_controller.login(user)


# Cập nhật thông tin tài khoản theo ID
@authRouter.put("/", dependencies=[Depends(require_authentication)])
async def update_profile(request: Request, user: UserUpdate):
    return await auth_controller.update_profile(request, user)


# Xoá tài khoản theo ID
@authRouter.delete("/", dependencies=[Depends(require_authentication)])
async def delete_user(request: Request):
    return await auth_controller.delete_user(request)


# Lấy thông tin tài khoản
@authRouter.get("/me", dependencies=[Depends(require_authentication)])
async def me(request: Request):
    return await auth_controller.get_me(request)
