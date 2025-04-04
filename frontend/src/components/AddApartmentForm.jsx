import React, { useState } from "react";

const AddApartmentForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(""); // Nouvel état pour le nombre de chambres
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("number_of_rooms", numberOfRooms);  // Ajouter le nombre de chambres
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/appartements/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Appartement créé avec succès", data);
      } else {
        throw new Error("Erreur lors de l'ajout de l'appartement");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom :
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description :
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Prix :
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <br />
      <label>
        Nombre de chambres : {/* Nouveau champ */}
        <input
          type="number"
          value={numberOfRooms}
          onChange={(e) => setNumberOfRooms(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image :
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </label>
      <br />
      <button type="submit">Ajouter l'appartement</button>
    </form>
  );
};

export default AddApartmentForm;
