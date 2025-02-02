from fastapi import HTTPException, Request
from app.configs.database import users
from bson import ObjectId
from app.services import user_service

async def get_user_by_email(email: str):
    result = await user_service.get_user_by_email(email)
    return {
        "status": 200,
        "success": True,
        "data": result
    }