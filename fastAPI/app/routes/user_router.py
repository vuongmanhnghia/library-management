# from fastapi import APIRouter  # type: ignore
# from app.models import User
# from app.controllers import user_controller
# from bson import ObjectId  # type: ignore


# userRouter = APIRouter()


# @userRouter.get("/all-users")
# async def all_users():
#     return user_controller.get_all_users()


# @userRouter.post("/create-user")
# async def create_user(user: User):
#     return user_controller.create_user(user)


# @userRouter.put("/users/{id}")
# async def update_user(id: str, user: User):
#     return user_controller.update_user(id, user)
