from dotenv import load_dotenv  # type: ignore
import os
from pymongo.mongo_client import MongoClient  # type: ignore

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL)
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
db = client["LibraryManagement"]


users = db["users"]
books = db["books"]
