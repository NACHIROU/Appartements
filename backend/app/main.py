from app.routes.apartment import router as appartements_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


# This part is useful to allow the backend and frontend server run together
origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173", 
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Inclure les routes
app.include_router(appartements_router, prefix="/api", tags=["appartements"])