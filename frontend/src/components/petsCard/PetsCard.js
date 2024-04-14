import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PetsCard.css";
import defaultImage from "../../images/Logo.png";
import { usePetsContext } from "../../hooks/usePetsContext"


export const PetsCard = () => {
  const { pets, dispatch } = usePetsContext();
  const [petImages, setPetImages] = useState({});
  

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  

  useEffect(() => {
    const fetchPets = async () => {
      const response = await fetch("/api/pets");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PETS", payload: json });

        // Fetch images for each pet
        const petImagePromises = json.map(async (pet) => {
          if (pet.photos && pet.photos[0]) {
            try {
            
            const imageResponse = await fetch(
              `/api/pets/photo/${pet.photos[0]}`
              
            );
            
        
            if (imageResponse.ok) {
              const imageBlob = await imageResponse.blob();
              setPetImages((prevImages) => ({
                ...prevImages,
                [pet._id]: URL.createObjectURL(imageBlob),
              }));
            }
          } catch (error) {
            console.error("Error fetching pet image:", error);
          }
        } else {
          console.error("Invalid photo ID for pet:", pet._id);
        }
        });

        await Promise.all(petImagePromises);
      }
    };

    fetchPets();
  }, [dispatch]);

  return (
    <div>
    
      <div className="Cards">
        <ul className="Cards-list">

          {pets &&
            pets.map((pet) => (
              <li key={pet._id} className="Cards-list-li">
                <img
                  src={petImages[pet._id] || defaultImage}
                  alt="pet"
                  className="Img"
                  onError={handleImageError}
                />
                <div className="Card-body">
                  <div className="Card-body-list">
                    <h3 className="Card-title"> {pet.name.slice(0, 10)} </h3>
                    <p className="Value">{pet.age.slice(0, 5)}</p>
                  </div>
                  <div className="Card-body-list">
                    <div className="Card-list-btn">
                      <p className="Value">{pet.breed.slice(0, 10)}</p>
                      <p className="Property">breed</p>
                    </div>
                    <div className="Card-list-btn">
                      <p className="Value">{pet.species}</p>
                      <p className="Property">species</p>
                    </div>
                    <div className="Card-list-btn">
                      <p className="Value">{pet.gender}</p>
                      <p className="Property">gender</p>
                    </div>
                  </div>
                  <div className="Description">
                    <p className="Card-text">
                      {pet.description.slice(0, 50) + "..."}
                    </p>
                  </div>
                  <div className="Card-list-li-bottom">
                    <div className="Card-list-bottom">
                      <p className="Value">{pet.adoptionStatus}</p>
                    </div>
                    <div className="Card-list-bottom">
                      <p className="Value">{pet.price}</p>
                    </div>
                  </div>
                  <div className="See-more">
                    <Link to={`/api/pets/${pet._id}`}>see more...</Link>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};
