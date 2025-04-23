import { useEffect, useState } from "react";
import ApartmentList from "../components/ApartmentList";
import { useNavigate } from "react-router-dom";

const ApartmentListPage = () => {
  const [apartments, setApartments] = useState([]);
  const navigate = useNavigate();

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
  
      await fetchApartments(); // Refresh après suppression
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const handleEdit = (apartment) => {
    navigate("/ajouter", { state: { apartment } }); // on passe les infos à la page du formulaire
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Appartements disponibles</h1>
        <button
          onClick={() => navigate("/ajouter")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter un appartement
        </button>
      </div>

      <ApartmentList apartments={apartments} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  );
};
export default ApartmentListPage;
