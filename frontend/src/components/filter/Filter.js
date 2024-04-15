import React, { useState } from 'react'

export const Filter = ({onFilter}) => {
    const [filters, setFilters] = useState({
      age: "",
      color: "",
      breed: "",
      species: "",
      gender: "",
      adoptionStatus: "",
      price: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFilters((prevFiltes) => ({
            ...prevFiltes,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      onFilter(filters);
    };



  return (
    <div className="filter">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="age"
          value={filters.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="color"
          value={filters.color}
          onChange={handleChange}
          placeholder="Color"
        />
        <input
          type="text"
          name="breed"
          value={filters.breed}
          onChange={handleChange}
          placeholder="Breed"
        />
        <input
          type="text"
          name="species"
          value={filters.species}
          onChange={handleChange}
          placeholder="Species"
        />
        <input
          type="text"
          name="gender"
          value={filters.gender}
          onChange={handleChange}
          placeholder="Gender"
        />
        <input
          type="text"
          name="adoptionStatus"
          value={filters.adoptionStatus}
          onChange={handleChange}
          placeholder="Adoption Status"
        />
        <input
          type="text"
          name="price"
          value={filters.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <button type="submit">Filter</button>
      </form>
    </div>
  );
}
