from app.configs.database import users
from app.schemas import user_schemas
from bson import ObjectId  # type: ignore


def get_all_users():
    list_users = user_schemas.list_users(users.find())
    return {"status": 200, "success": True, "message": "OK", "data": list_users}


def create_user(user):
    user = dict(user)
    users.insert_one(user)
    return {
        "status": 201,
        "success": True,
        "message": "Create new user success!",
        "data": user_schemas.detail_user(user),
    }


def update_user(id, user):
    user = dict(user)
    users.update_one({"_id": ObjectId(id)}, {"$set": user})
    return {"status": 200, "success": True, "message": "Update user success!"}


def delete_user(id):
    users.delete_user({"_id": ObjectId(id)})
    return {"status": 200, "success": True, "message": "Delete user success!"}
