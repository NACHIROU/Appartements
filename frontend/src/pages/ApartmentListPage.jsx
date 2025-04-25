import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApartmentList from "../components/ApartmentList";

const ApartmentListPage = () => {
  const [apartments, setApartments] = useState([]);
  const navigate = useNavigate();

  // Récupérer les appartements et leurs images
  const fetchApartments = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/appartements/");
      const data = await res.json();
      setApartments(data);
    } catch (err) {
      console.error("Erreur lors de la récupération :", err);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  // Fonction de suppression d'un appartement
  const handleDelete = async (id) => {
    const confirm = window.confirm("Es-tu sûr de vouloir supprimer cet appartement ?");
  
    if (!confirm) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/appartements/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }
  
      fetchApartments(); // Actualiser la liste après la suppression
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  // Fonction de modification d'un appartement
  const handleEdit = (apartment) => {
    navigate("/ajouter", { state: { apartment } }); // Passer les infos à la page de modification
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Appartements disponibles</h1>
        <button
          onClick={() => navigate("/ajouter")}
          className="btn-add-apartment"
        >
          Ajouter un appartement
        </button>
      </div>

      {/* Affichage de la liste des appartements */}
      <ApartmentList 
        apartments={apartments} 
        onDelete={handleDelete} 
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ApartmentListPage;
