from fastapi import HTTPException
from app.configs.database import users
from app.schemas.user_schemas import details_user

async def get_user_by_email(email: str):
    user = await users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.get("role") == "admin":
        raise HTTPException(status_code=403, detail="Forbidden: Admins cannot access other admins' details")
    
    user_id = str(user["_id"])
    
    return {
        "user_id": user_id,
        "user_details": details_user(user)
    }