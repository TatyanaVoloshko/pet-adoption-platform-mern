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
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="add-form"
    >
      <h1 className="new-pet">Update Information About Your Pet</h1>
      <div className="col-md-6 position-relative">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={updatedPetInfo.name}
          onChange={handleInputChange}
          className="form-control input-group-text"
        />
      </div>
      <div className="col-md-3 position-relative add-form-select">
        <select
          name="species"
          value={updatedPetInfo.species}
          onChange={handleInputChange}
          className="form-select input-group-text"
        >
          <option value="select the type of pet">select the type of pet</option>
          <option value="cat">cat</option>
          <option value="dog">dog</option>
          <option value="parrot">parrot</option>
          <option value="fish">fish</option>
          <option value="insect">insect</option>
          <option value="other pet">other pet</option>
        </select>
        <select
          name="gender"
          value={updatedPetInfo.gender}
          onChange={handleInputChange}
          className="form-select input-group-text"
        >
          <option value="select the gender of pet">
            select the gender of pet
          </option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
      <div className="col-md-6 position-relative">
        <label>Breed:</label>
        <input
          type="text"
          name="breed"
          value={updatedPetInfo.breed}
          onChange={handleInputChange}
          className="form-control input-group-text"
        />
      </div>
      <div className="col-md-6 position-relative">
        <label>Age:</label>
        <input
          type="text"
          name="age"
          value={updatedPetInfo.age}
          onChange={handleInputChange}
          className="form-control input-group-text"
        />
      </div>
      <div className="col-md-6 position-relative">
        <label>Color:</label>
        <input
          type="text"
          name="color"
          value={updatedPetInfo.color}
          onChange={handleInputChange}
          className="form-control input-group-text"
        />
      </div>
      <div className="col-md-6 position-relative">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={updatedPetInfo.description}
          onChange={handleInputChange}
          className="form-control input-group-text"
        />
      </div>
      <div className="col-md-6 position-relative">
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={updatedPetInfo.price}
          onChange={handleInputChange}
          className="form-control input-group-text"
        />
      </div>
      <div className="col-md-3 position-relative add-form-adoption">
        <select
          name="adoptionStatus"
          value={updatedPetInfo.adoptionStatus}
          onChange={handleInputChange}
          className="form-select input-group-text"
        >
          <option value="select the adoption status of pet">
            select the adoption status of pet
          </option>
          <option value="available">available</option>
          <option value="pending">pending</option>
          <option value="adopted">adopted</option>
        </select>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onInputChange}
        className="form-control input-group-text file"
      />
      <button type="submit" className="btn">
        Update
      </button>
    </form>
  );
};

export default UpdatePetForm;





