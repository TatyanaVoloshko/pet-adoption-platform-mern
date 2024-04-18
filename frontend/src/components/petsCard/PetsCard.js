/* frontend/src/components/petsCard/PetsCard.js */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PetsCard.css";
import defaultImage from "../../images/Logo.png";
import { usePetsContext } from "../../hooks/usePetsContext"
import { Filter } from "../filter/Filter";
import { MdFavorite } from "react-icons/md";
import useFavorite from "../../context/FavoritePetContext";


export const PetsCard = () => {
  const { pets, dispatch } = usePetsContext();
  const [petImages, setPetImages] = useState({});
  const [filteredPets, setFilteredPets] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableAges, setAvailableAges] = useState([]);
  const [availableBreeds, setAvailableBreeds] = useState([]);
  const [availablePrices, setAvailablePrices] = useState([]);
  const [availableSpecies, setAvailableSpecies] = useState([]);
  const [availableAdoptionStatus, setAvailableAdoptionStatus] = useState([]);
  const [availableGender, setAvailableGender] = useState([]);
  const { pets: petsFavs, addToFavorite, removeFromFavorite } = useFavorite();

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  useEffect(() => {
   
    const fetchPets = async () => {
      const response = await fetch("/api/pets");
      const json = await response.json();
     

      if (response.ok) {
        dispatch({ type: "SET_PETS", payload: json });

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

        const allColors = json.map(async (pet) => pet.color)
        await Promise.all(allColors).then((resolvedColors) => {
        const uniqueColors = Array.from(new Set(resolvedColors));
          setAvailableColors(uniqueColors);
          
        })

        const allAges = json.map(async (pet) => pet.age);
        await Promise.all(allAges).then((resolvedAges) => {
        const uniqueAges = Array.from(new Set(resolvedAges));
        setAvailableAges(uniqueAges);
        })

        const allBreeds = json.map(async (pet) => pet.breed);
        await Promise.all(allBreeds).then((resolvedBreeds) => {
          const uniqueBreeds = Array.from(new Set(resolvedBreeds));
          setAvailableBreeds(uniqueBreeds);
        });

        const allPrices = json.map(async (pet) => pet.price);
        await Promise.all(allPrices).then((resolvedPrices) => {
        const uniquePrices = Array.from(new Set(resolvedPrices));
        setAvailablePrices(uniquePrices);
        });

         const allSpecies = json.map(async (pet) => pet.species);
         await Promise.all(allSpecies).then((resolvedSpecies) => {
           const uniqueSpecies = Array.from(new Set(resolvedSpecies));
           setAvailableSpecies(uniqueSpecies);
         });
         const allAdoptionStatus = json.map(async (pet) => pet.adoptionStatus);
         await Promise.all(allAdoptionStatus).then(
           (resolvedAdoptionStatus) => {
             const uniqueAdoptionStatus = Array.from(new Set(resolvedAdoptionStatus));
             setAvailableAdoptionStatus(uniqueAdoptionStatus);
           }
         );
         const allGender = json.map(async (pet) => pet.gender);
         await Promise.all(allGender).then((resolvedGender) => {
           const uniqueGender = Array.from(new Set(resolvedGender));
           setAvailableGender(uniqueGender);
         });

      }
      
    };

    fetchPets();
  
  }, [dispatch]);
 
  const filterPets = (filters) => {
    const { species, breed, age, color, gender, price, adoptionStatus } = filters;

    const filtered = pets.filter((pet) => {
      const speciesMatch = species ? pet.species.toLowerCase().includes(species.toLowerCase()) : true;
      const breedMatch = breed
        ? pet.breed.toLowerCase().includes(breed.toLowerCase())
        : true;
      const ageMatch = age
        ? pet.age.toLowerCase().includes(age.toLowerCase())
        : true;
      const colorMatch = color
        ? pet.color.toLowerCase().includes(color.toLowerCase())
        : true;
      const genderMatch = gender
        ? pet.gender.toLowerCase().includes(gender.toLowerCase())
        : true;
      const priceMatch = price
        ? pet.price.toLowerCase().includes(price.toLowerCase())
        : true;
       const adoptionStatusMatch = adoptionStatus
         ? pet.adoptionStatus
             .toLowerCase()
             .includes(adoptionStatus.toLowerCase())
         : true;

      return speciesMatch && breedMatch && ageMatch && colorMatch && genderMatch && priceMatch && adoptionStatusMatch
    });

    
    setFilteredPets(filtered);
  }
  
  
  
  const handleFavoriteClick = (pet) => {
    if (isInFavorite(pet)) {
      removeFromFavorite(pet);
    } else {
      addToFavorite(pet);
    }
  };

  const isInFavorite = (pet) => {
    if (!petsFavs || petsFavs.length === 0) {
      return false
    }
    
    return petsFavs.some((favPet) => favPet._id === pet._id);
  };


  return (
    <div>
      <Filter
        onFilter={filterPets}
        availableColors={availableColors}
        availableAges={availableAges}
        availableBreeds={availableBreeds}
        availablePrices={availablePrices}
        availableSpecies={availableSpecies}
        availableAdoptionStatus={availableAdoptionStatus}
        availableGender={availableGender}
      />
      <div className="Cards">
        {pets && pets.length > 0 && (
          <ul className="Cards-list">
            {(filteredPets.length > 0 ? filteredPets : pets).map((pet) => (
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
                  onError={handleImageError}
                />
                <div className="Card-body">
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
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
