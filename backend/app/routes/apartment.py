from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from motor.motor_asyncio import AsyncIOMotorDatabase
import os
import uuid
import shutil
from app.database import get_database
from app.models.models import Apartement

router = APIRouter()
UPLOAD_DIR = "uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Check if the folder exists


@router.post("/appartements/")
async def create_apartment(
    apartment:Apartement,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Créer un appartement avec son image."""
    # Gestion de l'upload de l'image
    file = apartment.image
    file_ext = file.filename.split(".")[-1].lower()
    allowed_extensions = {"png", "jpg", "jpeg", "svg"}

    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file format")

    # Générer un nom unique pour l'image
    new_filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, new_filename)

    # Sauvegarder l'image sur le serveur
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Enregistrer les informations de l'appartement avec l'URL de l'image
    image_url = f"/uploads/{new_filename}"  # URL de l'image

    apartment_data = apartment.dict()  # Convertir l'objet Pydantic en dictionnaire
    apartment_data["image_url"] = image_url  # Ajouter l'URL de l'image

    # Insérer l'appartement dans la base de données
    result = await db.apartements.insert_one(apartment_data)

    return {"id": str(result.inserted_id), "message": "Appartement ajouté avec succès", "image_url": image_url}

@router.get("/appartements/")
async def get_all_appartments(db = Depends(get_database)):
    """ Retrieve all apartments"""
    apartments = await db.apartements.find().to_list(100)
    return [{"id": str(apt["_id"]), **{k: v for k, v in apt.items() if k != "_id"}} for apt in apartments]



@router.get("/appartements/{id}")
async def get_apartment(id:str, db = Depends(get_database)):
    """ Retrieve a single appartment"""
    apartment = await db.apartements.find_one({"_id":ObjectId(id)})
    if not apartment:
        raise HTTPException(status_code=404, detail="Apartment not found")

    apartment["id"] = str(apartment["_id"])
    del apartment["_id"]
    return apartment

@router.put("/appartements/{id}")
async def update_apartment(id: str, apartment:Apartement, db = Depends(get_database)):
    """ Update apartment"""
    curent_apartment = await db.apartements.find_one({"_id": ObjectId(id)})
    if not curent_apartment:
        raise HTTPException(status_code=404, detail="Apartment not found")
    
    await db.apartements.update_one(
    {"_id": ObjectId(id)}, {"$set": apartment.model_dump(exclude={"id"})}
)
    return{"Message": "Apartment updated successfully"}

@router.delete("/appartements/{id}")
async def delete_apartment(id:str, db = Depends(get_database)):
    """ Delete an apartment by id"""
    number_deleted = await db.apartements.delete_one({"_id":ObjectId(id)})
    if number_deleted.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Apartment not found")

    return {"message":"Apartment deleted succesfuly"}