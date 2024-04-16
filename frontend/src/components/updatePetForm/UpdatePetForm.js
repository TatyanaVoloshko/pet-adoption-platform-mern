/* frontend/src/components/updatePetForm/updatePetForm.js */
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

const UpdatePetForm = ({ pet, onSubmit }) => {

    const [updatedPetInfo, setUpdatedPetInfo] = useState({
      name: "",
      age: "",
      breed: "",
      color: "",
      description: "",
      price: "",
      gender: "",
      adoptionStatus: "",
      species: "",
    
    });
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    if (pet) {
      setUpdatedPetInfo({
        name: pet.name || "",
        age: pet.age || "",
        breed: pet.breed || "",
        color: pet.color || "",
        description: pet.description || "",
        price: pet.price || "",
        gender: pet.gender || "",
        adoptionStatus: pet.adoptionStatus || "",
        species: pet.species || "",
      });
    
    }
  }, [pet]);
    
   const handleInputChange = (event) => {
     const { name, value } = event.target;
     setUpdatedPetInfo((prevUpdatedPetInfo) => ({
       ...prevUpdatedPetInfo,
       [name]: value,
     }));
   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in updatedPetInfo) {
      formData.append(key, updatedPetInfo[key]);
    }
    formData.append('photos', photos)

    try {
      await onSubmit(formData);
      navigate(`/api/pets/${pet._id}`);
    } catch (error) {
      console.error("Failed to update pet:", error);
    }
  };

  const onInputChange = (e) => {
    setPhotos(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="name"
        value={updatedPetInfo.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="age"
        value={updatedPetInfo.age}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="breed"
        value={updatedPetInfo.breed}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="color"
        value={updatedPetInfo.color}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={updatedPetInfo.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="price"
        value={updatedPetInfo.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="gender"
        value={updatedPetInfo.gender}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="adoptionStatus"
        value={updatedPetInfo.adoptionStatus}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="species"
        value={updatedPetInfo.species}
        onChange={handleInputChange}
      />
      <input type="file" accept="image/*" onChange={onInputChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdatePetForm;





