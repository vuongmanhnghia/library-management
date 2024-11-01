from pydantic import BaseModel, Field  # type: ignore


class Book(BaseModel):
    title: str = Field(...)
    description: str = Field(...)
