/* frontend/src/components/petForm/petForm.js */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './PetForm.css'
import axios from "axios";

export const PetForm = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [species, setSpesies] = useState("");
  const [photos, setPhotos] = useState("");
  // const [owner, setOwner] = useState('')
    const [error, setError] = useState(null);
    
    const history = useNavigate()

   const handleSubmit = async (e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append("name", name);
     formData.append("species", species);
     formData.append("breed", breed);
     formData.append("age", age);
     formData.append("color", color);
     formData.append("gender", gender);
     formData.append("price", price);
     formData.append("description", description);
     formData.append("adoptionStatus", adoptionStatus);
     formData.append("photos", photos);

     try {
       const result = await axios.post("/api/pets", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });
       console.log(result.data);
       history("/");
     } catch (error) {
       console.error("Error submitting form:", error);
       setError("Failed to submit form");
     }
   };

   const onInputChange = (e) => {
     setPhotos(e.target.files[0]);
   };

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <h1 className="new-pet">Add a New Pet</h1>
        <div className="col-md-6 position-relative">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="write a name of the pet"
            className="form-control input-group-text"
          />
        </div>
        <div className="col-md-3 position-relative add-form-select">
          <select
            name={species}
            onChange={(e) => setSpesies(e.target.value)}
            className="form-select input-group-text"
          >
            <option value="select the type of pet">
              select the type of pet
            </option>
            <option value="cat">cat</option>
            <option value="dog">dog</option>
            <option value="parrot">parrot</option>
            <option value="fish">fish</option>
            <option value="insect">insect</option>
            <option value="other pet">other pet</option>
          </select>
          <select
            name={gender}
            onChange={(e) => setGender(e.target.value)}
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
          <input
            type="text"
            onChange={(e) => setBreed(e.target.value)}
            value={breed}
            placeholder="write a breed of the pet"
            className="form-control input-group-text"
          />
        </div>
        <div className="col-md-6 position-relative">
          <input
            type="text"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            placeholder="write an age of the pet"
            className="form-control input-group-text"
          />
        </div>

        <div className="col-md-6 position-relative">
          <input
            type="text"
            onChange={(e) => setColor(e.target.value)}
            value={color}
            placeholder="write a color of the pet"
            className="form-control input-group-text"
          />
        </div>
        <div className="col-md-6 position-relative">
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="write a description of the pet"
            className="form-control input-group-text"
          />
        </div>
        <div className="col-md-6 position-relative">
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="write a price of the pet"
            className="form-control input-group-text"
          />
        </div>
        <div className="col-md-3 position-relative add-form-adoption">
          <select
            name={adoptionStatus}
            onChange={(e) => setAdoptionStatus(e.target.value)}
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
        <div className="col-md-6 position-relative">
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onInputChange}
          className="form-control input-group-text file"
        />
        <button className="btn">Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
