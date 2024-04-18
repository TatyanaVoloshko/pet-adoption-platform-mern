import React, { useEffect, useState } from "react";
import useFavorite from "../context/FavoritePetContext";
import { MdFavorite } from "react-icons/md";
import './FavoritePets.css'
import defaultImage from "../images/Logo.png";
import { Link } from "react-router-dom";

const FavoritePets = () => {
  const { pets: favoritePets } = useFavorite();
  const [petImages, setPetImages] = useState({})
   const { pets: petsFavs, addToFavorite, removeFromFavorite } = useFavorite();
  
  useEffect(() => {
    const loadPetImages = async () => {
      try {
        const imagePromises = favoritePets.map(async (pet) => {
          const imageResponse = await fetch(`/api/pets/photo/${pet.photos[0]}`);
          if (imageResponse.ok) {
            const imageBlob = await imageResponse.blob();
            setPetImages((prevImages) => ({
              ...prevImages,
              [pet._id]: URL.createObjectURL(imageBlob),
            }));
          } else {
              console.error("Failed to load pet image:", imageResponse.status);
          }
        });

        await Promise.all(imagePromises);
      } catch (error) {
        console.error("Error loading pet images:", error);
      }
    };

    loadPetImages();
  }, [favoritePets]);

   const handleFavoriteClick = (pet) => {
     if (isInFavorite(pet)) {
       removeFromFavorite(pet);
     } else {
       addToFavorite(pet);
     }
   };

   const isInFavorite = (pet) => {
     if (!petsFavs || petsFavs.length === 0) {
       return false;
     }

     return petsFavs.some((favPet) => favPet._id === pet._id);
   };


  return (
    <div className="Cards">
      {favoritePets && favoritePets.length > 0 ? (
        <ul className="Cards-list">
          {favoritePets.map((pet) => (
            <li key={pet._id} className="Cards-list-li">
              <div>
                <MdFavorite
                  className={`Favorite ${
                    isInFavorite(pet) ? "Favorite-selected" : ""
                  }`}
                  onClick={() => handleFavoriteClick(pet)}
                />
              </div>
              <img
                src={petImages[pet._id] || defaultImage}
                alt="pet"
                className="Img"
              />
              <div className="Card-body-list">
                <h3 className="Card-title"> {pet.name.slice(0, 10)} </h3>
                <p className="Value">{pet.age.slice(0, 7)}</p>
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
            </li>
          ))}
        </ul>
      ) : (
        <p className="Card-text Description">
          You don't have any favorite pets yet...
        </p>
      )}
    </div>
  );
};

export default FavoritePets;
