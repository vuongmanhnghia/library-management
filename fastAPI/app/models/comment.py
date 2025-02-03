from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional

class Comment(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    content: str = Field(..., description="Content of the comment")
    full_name: str = Field(..., description="Full name of the user")
    role: str = Field(..., description="Role of the user")
    created_at: Optional[datetime] = Field(None, description="Creation time")
    updated_at: Optional[datetime] = Field(None, description="Last updated time")

class CreateComment(BaseModel):
    content: str

    @validator("content")
    def content_must_not_be_empty(cls, value):
        if not value.strip():
            raise ValueError("Comment content cannot be empty")
        return value
