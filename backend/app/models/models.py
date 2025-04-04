from fastapi import File, UploadFile
from pydantic import BaseModel, Field, HttpUrl
from typing import Optional

class Apartement(BaseModel): 
    """ Represent an apartment listing"""

    id: Optional[str] = Field(None, alias="_id")
    title:str
    description:str
    price:float
    room:Optional[int] = None
    image_url:UploadFile = File(...)
