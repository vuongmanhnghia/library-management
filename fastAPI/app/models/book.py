from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


# Schema cho Book
class Book(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")  # Alias cho MongoDB ObjectId
    title: str = Field(..., description="Title of the book")
    author: str = Field(..., description="Author of the book")
    published_date: str = Field(..., description="Publication date of the book")
    introduction: str = Field(..., description="Introduction to the book")
    cover: str = Field(..., description="URL of the book cover")
    file: str = Field(..., description="URL of the book file")
    created_at: Optional[datetime] = Field(None, description="Creation time")
    updated_at: Optional[datetime] = Field(None, description="Last updated time")

    class Config:
        populate_by_name = True


# Schema cho tạo mới sách
class BookCreate(Book):
    pass


# Schema cho cập nhật sách
class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    published_date: Optional[str] = None
    introduction: Optional[str] = None
    cover: Optional[str] = None
    file: Optional[str] = None


# Schema cho phân trang
class ReadRoot(BaseModel):
    page: int
    per_page: int
