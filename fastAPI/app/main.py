# File chính để chạy ứng dụng FastAPI
import os
import uvicorn
from fastapi import FastAPI  # type: ignore
from .routes import router  # Cập nhật đường dẫn import
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hoặc ["*"] để cho phép tất cả
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Lấy PORT từ môi trường
    uvicorn.run(app, host="0.0.0.0", port=port)
