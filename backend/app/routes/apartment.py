import collections
from typing import Optional
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
import os
import uuid
import shutil
from app.database import get_database
from app.models.models import Apartement, AppartementUpdateModel

router = APIRouter()


UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/appartements/")
async def create_appartement(
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    number_of_rooms: int = Form(...),
    image: UploadFile = File(...),
    db=Depends(get_database),
):
    # Sauvegarder l'image avec un nom unique
    ext = os.path.splitext(image.filename)[1]
    filename = f"{uuid.uuid4()}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    appartement = {
        "name": name,
        "description": description,
        "price": price,
        "number_of_rooms": number_of_rooms,
        "image_url": f"/uploads/{filename}",
    }
    result = await db.apartements.insert_one(appartement)

    # À ce stade, tu pourrais insérer dans MongoDB avec l'URL de l'image
    return JSONResponse(
        {
            "_id": str(result.inserted_id),
            "name": name,
            "description": description,
            "price": price,
            "number_of_rooms": number_of_rooms,
            "image_url": f"/uploads/{filename}",
        }
    )


@router.get("/appartements/")
async def get_all_appartments(db=Depends(get_database)):
    """Retrieve all apartments"""
    apartments = await db.apartements.find().to_list(100)
    return [
        {"id": str(apt["_id"]), **{k: v for k, v in apt.items() if k != "_id"}}
        for apt in apartments
    ]


@router.get("/appartements/{id}")
async def get_apartment(id: str, db=Depends(get_database)):
    """Retrieve a single appartment"""
    apartment = await db.apartements.find_one({"_id": ObjectId(id)})
    if not apartment:
        raise HTTPException(status_code=404, detail="Apartment not found")

    apartment["id"] = str(apartment["_id"])
    del apartment["_id"]
    return apartment


@router.put("/appartements/{id}")
async def update_apartment(
    id: str,
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    number_of_rooms: int = Form(...),
    image: Optional[UploadFile] = File(None),
    db=Depends(get_database),
):
    try:
        object_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID invalide")

    existing_apartment = await db.apartements.find_one({"_id": object_id})
    if not existing_apartment:
        raise HTTPException(status_code=404, detail="Appartement non trouvé")

    update_data = {
        "name": name,
        "description": description,
        "price": price,
        "number_of_rooms": number_of_rooms,
    }

    if image:
        image_path = f"/uploads/{image.filename}"
        full_path = f"uploads/{image.filename}"
        with open(full_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        update_data["image_url"] = image_path

    result = await db.apartements.update_one({"_id": object_id}, {"$set": update_data})

    if result.modified_count == 0:
        raise HTTPException(status_code=304, detail="Aucune modification appliquée")

    return {"message": "Appartement mis à jour avec succès"}


@router.delete("/appartements/{appartement_id}")
async def delete_appartement(appartement_id: str, db=Depends(get_database)):
    try:
        obj_id = ObjectId(appartement_id)
    except:
        raise HTTPException(status_code=400, detail="ID invalide")

    result = await db.apartements.delete_one({"_id": obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appartement non trouvé")

    return {"message": "Appartement supprimé"}
