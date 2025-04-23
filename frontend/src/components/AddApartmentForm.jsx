import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddApartmentForm = ({ onApartmentAdded, clearEdit }) => {
  const location = useLocation();
  const apartmentToEdit = location.state?.apartment;
  
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (apartmentToEdit) {
      setName(apartmentToEdit.name); // ✅
      setDescription(apartmentToEdit.description);
      setPrice(apartmentToEdit.price);
      setNumberOfRooms(apartmentToEdit.number_of_rooms); // ✅
      setImage(null); // Doit être rechargée
    }
  }, [apartmentToEdit]);
  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setNumberOfRooms("");
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name); // ✅ Correct maintenant
    formData.append("description", description);
    formData.append("price", price);
    formData.append("number_of_rooms", numberOfRooms); // ✅ Correct maintenant
    if (image) formData.append("image", image);

    try {
      let response;
      if (apartmentToEdit) {
        response = await fetch(`http://127.0.0.1:8000/api/appartements/${apartmentToEdit.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch("http://127.0.0.1:8000/api/appartements/", {
          method: "POST",
          body: formData,
        });
      }

      if (!response.ok) throw new Error("Erreur lors de l’envoi du formulaire");

      onApartmentAdded?.();
      clearForm();
      clearEdit?.();

      navigate("/"); // ✅ Redirection vers la liste
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-md p-6 rounded-2xl border border-gray-200 max-w-xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        {apartmentToEdit ? "Modifier un appartement" : "Ajouter un appartement"}
      </h2>

      <input
        type="text"
        placeholder="Titre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Nombre de pièces"
          value={numberOfRooms}
          onChange={(e) => setNumberOfRooms(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full mt-2"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {apartmentToEdit ? "Enregistrer les modifications" : "Ajouter"}
      </button>
    </form>
  );
};

export default AddApartmentForm;
