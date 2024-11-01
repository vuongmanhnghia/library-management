from app.configs.database import users
from app.schemas import user_schemas
from bson import ObjectId  # type: ignore


def get_all_users():
    list_users = user_schemas.list_users(users.find())
    return {"data": list_users}


def create_user(user):
    user = dict(user)
    users.insert_one(user)
    return {"data": user_schemas.detail_user(user)}


def update_user(id, user):
    user = dict(user)
    users.update_one({"_id": ObjectId(id)}, {"$set": user})
    return {"data": user_schemas.detail_user(user)}
