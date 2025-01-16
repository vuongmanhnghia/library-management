from fastapi import HTTPException
from datetime import datetime
from app.configs.database import users
from app.models.user import User
from app.schemas.user_schemas import details_user, list_users
from bson import ObjectId
from app.utils.verify_password import verify_password


# AuthService
async def register(user):
    # Kiểm tra xem email đã tồn tại chưa
    if await users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    now = datetime.utcnow()
    user = user.dict(by_alias=True)
    user.pop("_id", None)
    user["created_at"] = now
    user["updated_at"] = now

    try:
        result = await users.insert_one(user)
        user["_id"] = str(result.inserted_id)
        return details_user(user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def login(current_user):
    current_user = current_user.dict(by_alias=True)
    user = await users.find_one({"email": current_user["email"]})
    # Verify password
    if user and verify_password(current_user["password"], user["password"]):
        user["_id"] = str(user["_id"])
        user["created_at"] = user["created_at"]
        user["updated_at"] = user["updated_at"]
        return details_user(user)
    raise HTTPException(status_code=500, detail="Email or password is incorrect")


async def profile(request):
    user = await users.find_one({"_id": request.state.user["_id"]})
    user["_id"] = str(user["_id"])
    user["created_at"] = user["created_at"]
    user["updated_at"] = user["updated_at"]
    return User(**user)


async def update_profile(id, user):
    user = user.dict(by_alias=True)
    user["updated_at"] = datetime.utcnow()
    user = await users.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": user}, return_document=True
    )
    if user:
        user["_id"] = str(user["_id"])
        user["created_at"] = user["created_at"]
        user["updated_at"] = user["updated_at"]
        user["_id"] = id
        return User(**user)
    raise HTTPException(status_code=404, detail="User not found")


async def delete_user(id):
    result = await users.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return {"_id": id}
    raise HTTPException(status_code=404, detail="User not found")
