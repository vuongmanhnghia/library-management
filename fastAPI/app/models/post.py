from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional

class Post(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str = Field(..., description="Title of the post")
    content: str = Field(..., description="Content of the post")
    image: str = Field(default=None, description="Image of the post")
    full_name: str = Field(..., description="Full name of the user")
    role: str = Field(..., description="Role of the user")
    created_at: Optional[datetime] = Field(None, description="Creation time")
    updated_at: Optional[datetime] = Field(None, description="Last updated time")
    
class GetPosts(BaseModel):
    page: int
    per_page: int
    total_books: int
    
class CreatePost(BaseModel):
    content: str = Field(..., description="Content of the post")
    image: str = Field(default=None, description="Image of the post")