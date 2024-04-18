//frontend/src/components/fullPetsCard/fullPetsCard.js
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePetsContext } from "../../hooks/usePetsContext";
import { AuthContext } from "../../context/AuthContext";
import { MdFavorite } from "react-icons/md";
import defaultImage from "../../images/Logo.png";
import "./FullPetsCard.css";
import useFavorite from "../../context/FavoritePetContext";


export const FullPetsCard = () => {
  
  const { dispatch } = usePetsContext();
  const { user } = useContext(AuthContext); // Get current user from context
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { pets: petsFavs, addToFavorite, removeFromFavorite } = useFavorite();
 
  const history = useNavigate();

  const [petImage, setPetImage] = useState({});

  useEffect(() => {
    const fetchPet = async () => {
      try {
   const response = await fetch(`/api/pets/${id}`);
        const json = await response.json();
        
        if (response.ok) {
          setPet(json);
          if (json.photos && json.photos[0]) {
            const imageResponse = await fetch(
              `/api/pets/photo/${json.photos[0]}`
            );
            if (imageResponse.ok) {
              const imageBlob = await imageResponse.blob();
              setPetImage(URL.createObjectURL(imageBlob));
            } else {
              console.error(
                "Error fetching pet image:",
                imageResponse.statusText
              );
            }
          } else {
            console.error("No photo available for pet:", json._id);
          }
        } else {
          console.error("Error fetching pet data:", json);
        }
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPet();
  }, [id]);

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };


  const canUpdate = user && pet.owner === user._id; // canUpdate if user is the author of the post

  const handleClickDelete = async () => {
    const response = await fetch(`/api/pets/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PET", payload: json });
      history("/");
    }
  };

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
    <div className="container">
      <div className="full-card-container">
        <img
          src={petImage || defaultImage}
          alt="pet"
          className="card-img-full"
          onError={handleImageError}
        />

        <div className="full-info">
          <div className="full-favorite">
            <MdFavorite
              className={`favorite ${
                isInFavorite(pet) ? "favorite-selected" : ""
              }`}
              onClick={() => handleFavoriteClick(pet)}
            />
          </div>
          <div className="card-list-li">
            <h3 className="card-title">
              {pet.name ? pet.name.slice(0, 10) : ""}
            </h3>
            <p className="value">{pet.age ? pet.age.slice(0, 5) : ""}</p>
          </div>

          <div className="card-list-li">
            <div className="card-full-btn">
              <p className="value">
                {pet.breed ? pet.breed.slice(0, 10) : "no"}
              </p>
              <p className="property">breed</p>
            </div>
            <div className="card-full-btn">
              <p className="value">{pet.species}</p>
              <p className="property">species</p>
            </div>
            <div className="card-full-btn">
              <p className="value">{pet.color}</p>
              <p className="property">color</p>
            </div>
            <div className="card-full-btn">
              <p className="value">{pet.gender}</p>
              <p className="property">gender</p>
            </div>
          </div>
          <p className="card-text description-full">{pet.description}</p>
          <div className="card-list-li">
            <div className="card-full-bottom">
              <p className="value">{pet.adoptionStatus}</p>
              <p className="property">adoption status</p>
            </div>
            <div className="card-full-bottom">
              <p className="value">{pet.price}</p>
              <p className="property">price</p>
            </div>
          </div>

          <button onClick={handleClickDelete} className="btn-delete">
            Delete
          </button>
          {canUpdate && (
            <Link to={`/api/pets/update/${id}`} className="btn-update">
              Update
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
