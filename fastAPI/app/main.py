# File chính để chạy ứng dụng FastAPI

from fastapi import FastAPI  # type: ignore
from .routes import router  # Cập nhật đường dẫn import

app = FastAPI()


app.include_router(router)
