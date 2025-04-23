from motor.motor_asyncio import AsyncIOMotorClient
import motor.motor_asyncio
import os
from dotenv import load_dotenv

# load environment variables

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# Initialize MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db["appartements"]


async def get_database():
    return db
