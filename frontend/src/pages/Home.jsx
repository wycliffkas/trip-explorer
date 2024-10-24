import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "../components/Card";

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrips = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/v1/trips");
        if (response.ok) {
          const tripsData = await response.json();
          setTrips(tripsData); 
        } else {
          console.error("Failed to fetch trips");
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTrips();
  }, []);

  const handleCardClick = (tripId) => {
    navigate(`/trip/${tripId}`);
  };

  if (isLoading) return <div>Loading trips...</div>;

  return (
    <Box display="flex" flexWrap="wrap" gap={3} m={3} className="container">

      {trips?.map((trip) => (
        <Box key={trip.id} onClick={() => handleCardClick(trip.id)}>
          <Card country={trip.country} galleryImages={trip.galleryImages} />
        </Box>
      ))}
    </Box>
  );
};

export default Home;
