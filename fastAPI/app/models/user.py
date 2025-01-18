from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional
from bcrypt import hashpw, gensalt


# Schema cho Book
class User(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")  # Alias cho MongoDB ObjectId
    email: str = Field(..., description="Email of the user")
    password: str = Field(..., description="Password of the user")
    phone_number: str = Field(..., description="Phone number of the user")
    full_name: str = Field(..., description="Full name of the user")
    avatar: str = Field(..., description="URL of the user avatar")
    role: str = Field(default="user", description="Role of the user")
    created_at: Optional[datetime] = Field(None, description="Creation time")
    updated_at: Optional[datetime] = Field(None, description="Last updated time")

    # hash password before save
    @validator("password", pre=True, always=True)
    def hash_password(cls, value):
        if not value:
            raise ValueError("Password is required")
        return hashpw(value.encode("utf-8"), gensalt(10)).decode("utf-8")

    class Config:
        populate_by_name = True


# Schema cho tạo user mới
class UserRegister(User):
    pass


class UserLogin(BaseModel):
    email: str
    password: str


# Schema cho cập nhật sách
class UserUpdate(BaseModel):
    email: Optional[str] = None
    full_name: Optional[str] = None
    phone_number: Optional[str] = None
    avatar: Optional[str] = None


# Schema cho phân trang
class ReadRoot(BaseModel):
    page: int
    per_page: int
