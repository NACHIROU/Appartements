// src/components/ApartmentList.jsx

import React, { useEffect, useState } from 'react';
import AddApartmentForm from "./AddApartmentForm";


function ApartmentList() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/appartements/');
        if (!response.ok) {
          throw new Error('Failed to fetch apartments');
        }
        const data = await response.json();
        setApartments(data);  // Assure-toi que les données sont correctes
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
    <h1>Liste des Appartements</h1>
    <AddApartmentForm onApartmentAdded={(newApartment) => setApartments([...apartments, newApartment])} />
    {apartments.length === 0 ? (
      <p>No apartment available</p>
    ) : (
      <ul>
        {apartments.map((apartment) => (
          <li key={apartment.id}>
            <h3>{apartment.title}</h3>
            <p>{apartment.description}</p>
            <p>Prix: {apartment.price}€</p>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
}

export default ApartmentList;
