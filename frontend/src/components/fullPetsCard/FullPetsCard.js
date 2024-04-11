import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'

export const FullPetsCard = () => {
    const {id} = useParams()
  const [pet, setPet] = useState({});
 
    useEffect(() => {
    const fetchPet = async () => {
      try {
          const response = await fetch(`/api/pets/${id}`);
          const json = await response.json();

        if (response.ok) {
          setPet(json);
        } else {
          console.error("Error data:", json);
        }
      } catch (error) {
        console.error("Error request:", error);
      }
    };

    fetchPet()

    
  }, [id]);

  return (
    <div>
     
          <h2>{pet.name}</h2>
          <p>{pet.age}</p>
          <p>{pet.breed}</p>
         
    </div>
  );
};
