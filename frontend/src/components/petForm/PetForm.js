import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ('./PetForm.css')

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

    const pet = {
      name,
      species,
      breed,
      age,
      color,
      gender,
      price,
      description,
      photos,
      adoptionStatus,
      //   owner
    };

    const response = await fetch("/api/pets", {
      method: "POST",
      body: JSON.stringify(pet),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
        history('/')
    }
    if (response.ok) {
      setName("");
      setBreed("");
      setAge("");
      setColor("");
      setDescription("");
      setPrice("");
      setGender("");
      setAdoptionStatus("");
      setSpesies("");
      setPhotos("");

      setError(null);
      console.log("new pet added", json);
    }
  };

  return (
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
          <option value="select the type of pet">select the type of pet</option>
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
        <input
          type="file"
          onChange={(e) => setPhotos(e.target.value)}
          value={photos}
          placeholder="write a photos of the pet"
          className="form-control input-group-text"
        />
      </div>

      <button className="btn">Submit</button>
      {error && <div className="Error">{error}</div>}
    </form>
  );
}
