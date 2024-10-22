import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./TripDetails.css";
import defaultImage from "../images/default.png";

const TripDetails = ({ isLoggedIn }) => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrip = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/trips/${tripId}`);
        if (response.ok) {
          const tripData = await response.json();
          setTrip(tripData);
        } else {
          const errorText = await response.text();
          console.error("Failed to fetch trip details:", errorText);
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTrip();
  }, [tripId]);

  const imageUrl =
    trip?.galleryImages?.length > 0 ? trip.galleryImages[0] : defaultImage;

  const handleDeleteTrip = async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/trips/${tripId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Trip deleted successfully.");
          navigate("/");
        } else {
          let errorMessage = "Failed to delete trip.";
          if (response.status === 404) {
            errorMessage = "Trip not found.";
          } else {
            const errorText = await response.text();
            errorMessage += ` ${errorText}`;
          }
          console.error("Error deleting trip:", errorMessage);
          alert(errorMessage);
        }
      } catch (error) {
        console.error("Error deleting trip:", error);
        alert("An error occurred while deleting the trip.");
      }
    }
  };

  if (isLoading) return <div>Loading trip details...</div>;

  if (!trip) return <div>No trip details found</div>;

  return (
    <div className="container">
      <div className="content">
        <div>
          <img
            src={imageUrl}
            alt={trip.country || "No Country"}
            width="600"
            height="400"
          />
        </div>

        <div>
          <h1>{trip.country}</h1>
          <p>
            <span>Airport:</span> {trip.airport}
          </p>
          <p>
            <span>Hotel:</span> {trip.hotel}
          </p>

          {isLoggedIn && (
            <div style={{ marginTop: '16px' }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteTrip}
                sx={{ mt: 2 }}
              >
                Delete Trip
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="gallery">
        {trip.galleryImages && trip.galleryImages.length > 0 ? (
          trip.galleryImages.map((url, index) => (
            <img
              key={index}
              src={url || defaultImage}
              alt={`Gallery Image ${index + 1}`}
              width={300}
              height={200}
            />
          ))
        ) : (
          <p>No gallery images available.</p>
        )}
      </div>
    </div>
  );
};

export default TripDetails;
