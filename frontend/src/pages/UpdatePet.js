import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdatePetForm from "../components/updatePetForm/UpdatePetForm";

export const UpdatePet = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`/api/pets/${id}`);
        const json = await response.json();
        if (response.ok) {
          setPet(json);
        } else {
          console.error("Failed to fetch pet data:", json);
        }
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };
    fetchPet();

  }, [id]);

  const handleUpdatePet = async (formData) => {
    try {
      const response = await fetch(`/api/pets/${id}`, {
        method: "PATCH",
        body: formData,
      });
      if (response.ok) {
        console.log("Pet updated successfully");
      } else {
        console.error("Failed to update pet");
      }
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return <UpdatePetForm pet={pet} onSubmit={handleUpdatePet} />
    
};
