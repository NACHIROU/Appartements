import ApartmentCard from "./ApartmentCard"; // Facultatif si tu veux séparer encore plus

const ApartmentList = ({ apartments, onDelete, onEdit }) => {
  return (
    <div className="container">
      {apartments.map((apartment) => (
        <div key={apartment.id} className="apartment">
          <h2>{apartment.name}</h2>
          <p>{apartment.description}</p>
          <p>Prix : {apartment.price} €</p>
          <p>Pièces : {apartment.number_of_rooms}</p>
          <img
            src={`http://localhost:8000${apartment.image_url}`}
            alt={apartment.name}
          />
        <div>
            <button
              className="btn btn-edit"
              onClick={() => onEdit(apartment)}
            >
              Modifier
            </button>

            <button
              className="btn btn-delete"
              onClick={() => onDelete(apartment.id)}
            >
              Supprimer
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ApartmentList;
