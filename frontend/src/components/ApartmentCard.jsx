import { useState } from "react";

const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p className="text-gray-500 italic">Aucune image disponible</p>;
  }

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <img
        src={`http://localhost:8000${images[index]}`}
        alt={`Image ${index + 1}`}
        className="carousel-image"
      />

      {images.length > 1 && (
        <div className="carousel-controls">
          <button onClick={prevImage}>&larr;</button>
          <button onClick={nextImage}>&rarr;</button>
        </div>
      )}
    </div>
  );
};

const ApartmentCard = ({ apartment, onDelete, onEdit }) => {
  if (!apartment) return null;

  return (
    <div className="cart p-4 border rounded-xl shadow-sm bg-white">
      <ImageCarousel images={apartment.image_urls} />

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{apartment.name}</h2>
        <p className="text-sm text-gray-600">{apartment.description}</p>
        <p className="text-sm text-gray-700 font-medium mt-1">💶 Prix : {apartment.price} €</p>
        <p className="text-sm text-gray-700 font-medium">🛏️ Pièces : {apartment.number_of_rooms}</p>

        <div className="btn">
          <button
            className="btn-delete"
            onClick={() => onDelete(apartment.id)}
          >
            Supprimer
          </button>
          <button
            className="btn-edit"
            onClick={() => onEdit(apartment)}
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
