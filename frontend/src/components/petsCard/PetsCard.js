import React, { useEffect, useState } from "react";
import './PetsCard.css'
import defaultImage from "../../images/Logo.png";


export const PetsCard = () => {
  const [pets, setPets] = useState(null);

  const handleImageError = (event) => {
    event.target.src = defaultImage; 
  };

  useEffect(() => {
    const fetchPets = async () => {
      const response = await fetch("/api/pets");
      const json = await response.json();

      if (response.ok) {
        setPets(json);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="Cards">
      <ul className="Cards-list">
        {pets &&
          pets.map((pet) => (
            <li key={pet._id} className="Cards-list-li">
              <img
                src={pet.photos[0] ? pet.photos[0] : defaultImage}
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
                  <a href="/home/fullPetCards/<%= pets[i]._id %>">
                    see more...
                  </a>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
