from fastapi import File, Form, UploadFile
from pydantic import BaseModel, Field, HttpUrl
from typing import Optional


class Apartement(BaseModel):
    """Represent an apartment listing"""

    id: Optional[str] = Field(None, alias="_id")
    title: str
    description: str
    price: float
    room: Optional[int] = None
    image_urls: UploadFile = File(...)


class AppartementUpdateModel(BaseModel):
    title: str
    description: str
    price: float
    room: int
