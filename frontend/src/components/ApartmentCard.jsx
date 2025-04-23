const ApartmentCard = ({ apartment, onDelete, onEdit }) => {
  return (
    <div className="cart">
      <div className="overflow-hidden rounded-xl">
        <img
          src={`http://localhost:8000${apartment.image_url}`}
          alt={apartment.name}
          className="w-full aspect-[4/3] object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{apartment.name}</h2>
        <p className="text-sm text-gray-600">{apartment.description}</p>
        <p className="text-sm text-gray-700 font-medium mt-1">💶 Prix : {apartment.price} €</p>
        <p className="text-sm text-gray-700 font-medium">🛏️ Pièces : {apartment.room}</p><br/>

        <div className="mt-3 flex gap-2">
          <button
            className="bg-rose-500 text-white px-4 py-1.5 rounded-lg hover:bg-rose-600 transition"
            onClick={() => onDelete(apartment.id)}
          >
            Supprimer
          </button><br/>
          <button
            className="bg-indigo-500 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-600 transition"
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
