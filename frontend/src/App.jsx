import { useState, useEffect } from "react";
import ApartmentList from "./components/ApartmentList";
import AddApartmentForm from "./components/AddApartmentForm";

function App() {
  const [apartments, setApartments] = useState([]);

  const fetchApartments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/appartements/");
      if (!response.ok) throw new Error("Erreur lors de la récupération des appartements");
      const data = await response.json();
      setApartments(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  return (
    <div>
      <ApartmentList apartments={apartments} />
    </div>
  );
}

export default App;