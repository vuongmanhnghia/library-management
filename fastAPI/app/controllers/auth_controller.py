from app.configs.database import users
from bson import ObjectId
from app.services import auth_service


async def register(user):
    result = await auth_service.register(user)
    return {
        "status": 201,
        "success": True,
        "message": "Create new user success!",
        "data": result,
    }


async def login(user):
    valid_login = await auth_service.login(user)
    result = await auth_service.auth_token(valid_login)
    return {
        "status": 200,
        "success": True,
        "message": "Login success!",
        "data": result,
    }


async def profile(request):
    result = await auth_service.profile(request)
    return {
        "status": 200,
        "success": True,
        "message": "OK",
        "data": result,
    }


async def update_profile(id, user):
    result = await auth_service.update_profile(id, user)
    return {
        "status": 200,
        "success": True,
        "message": "Update user success!",
        "data": result,
    }


async def delete_user(id):
    result = await auth_service.delete_user(id)
    return {
        "status": 200,
        "success": True,
        "message": "Delete user success!",
        "data": result,
    }
