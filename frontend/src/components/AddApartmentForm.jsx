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
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (apartmentToEdit) {
      setName(apartmentToEdit.name);
      setDescription(apartmentToEdit.description);
      setPrice(apartmentToEdit.price);
      setNumberOfRooms(apartmentToEdit.number_of_rooms);
      setImageFiles([]); // Réinitialiser les fichiers image
      setImagePreviews([]); // Réinitialiser les prévisualisations

      // Si l'appartement a des images existantes, on les affiche
      if (apartmentToEdit.image_urls && apartmentToEdit.image_urls.length > 0) {
        setImagePreviews(apartmentToEdit.image_urls); // Ajouter les images existantes
      }
    }
  }, [apartmentToEdit]);

  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setNumberOfRooms("");
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Prévisualiser les images
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("number_of_rooms", numberOfRooms);

    // Ajouter les images au formData si elles existent
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

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

      navigate("/"); // Redirection vers la liste
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="apartment-form"
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
        className="champ-de-texte"
      /><br/>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="champ-de-texte"
      /><br/>

        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="champ-de-texte"
        /><br/>

        <input
          type="number"
          placeholder="Nombre de pièces"
          value={numberOfRooms}
          onChange={(e) => setNumberOfRooms(e.target.value)}
          required
          className="champ-de-texte"
        /><br/>

      {/* Prévisualisation des images existantes */}
      <div className="mb-4">
        {imagePreviews.length > 0 && (
          <div className="flex gap-2">
            {imagePreviews.map((imageUrl, index) => (
              <img
                key={index}
                src={`http://127.0.0.1:8000${imageUrl}`}
                alt={`Prévisualisation ${index + 1}`}
                className="h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      {/* Sélecteur de fichiers pour images */}
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="w-full mt-2"
      /><br/>

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
