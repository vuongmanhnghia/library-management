from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

# Khởi tạo client Motor
client = AsyncIOMotorClient(MONGO_URL)

# Kết nối đến database
db = client["LibraryManagement"]

# Các collection
users = db["users"]
books = db["books"]
