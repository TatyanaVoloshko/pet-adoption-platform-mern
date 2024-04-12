import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import defaultImage from "../../images/Logo.png";
import './FullPetsCard.css'

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
  
  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="container">
      <div className="full-card-container">
        <img
          src={pet.photos && pet.photos[0] ? pet.photos[0] : defaultImage}
          alt="pet"
          className="card-img-full"
          onError={handleImageError}
        />
        <div className="full-info">
          <div className="card-list-li">
            <h3 className="card-title">
              {pet.name ? pet.name.slice(0, 10) : ""}
            </h3>
            <p className="value">{pet.age ? pet.age.slice(0, 5) : ""}</p>
          </div>

          <div className="card-list-li">
            <div className="card-full-btn">
              <p className="value">{pet.breed ? pet.breed.slice(0, 10) : "no"}</p>
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
          <form
            action="/home/delete-pet/<%= pet.id %>"
            method="post"
            className="update-form"
          >
            <button className="btn-delete">Delete</button>
            <a href="/home/update-petCard/<%= pet.id %>" className="btn-update">
              Edit
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};
