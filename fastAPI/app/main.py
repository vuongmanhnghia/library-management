# File chính để chạy ứng dụng FastAPI

from fastapi import FastAPI  # type: ignore
from .routes import router  # Cập nhật đường dẫn import
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Hoặc ["*"] để cho phép tất cả
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
