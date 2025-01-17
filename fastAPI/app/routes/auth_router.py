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


# Xem thông tin tài khoản
@authRouter.get("/profile")
async def profile(request: Request):
    return await auth_controller.profile(request)


# Cập nhật thông tin tài khoản theo ID
@authRouter.put("/{id}")
async def update_profile(id: str, user: UserUpdate):
    return await auth_controller.update_profile(id, user)


# Xoá tài khoản theo ID
@authRouter.delete("/{id}")
async def delete_user(id: str):
    return await auth_controller.delete_user(id)


# Lấy thông tin tài khoản
@authRouter.get("/me", dependencies=[Depends(require_authentication)])
async def me(request: Request):
    return await auth_controller.get_me(request)
