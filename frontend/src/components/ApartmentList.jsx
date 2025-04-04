// src/components/ApartmentList.jsx

import React, { useEffect, useState } from 'react';

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
      <h2>List of Apartments</h2>
      {apartments.length === 0 ? (
        <p>No apartments available.</p>
      ) : (
        <ul>
          {apartments.map((apartment, index) => (
            <li key={index}>
              <h3>{apartment.name}</h3>
              <p>{apartment.description}</p>
              <p>Price: ${apartment.price}</p>
              <p>Image: {apartment.image_url}</p>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApartmentList;
