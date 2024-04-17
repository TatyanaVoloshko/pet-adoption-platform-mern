//frontend/src/components/filter/Filter.js
import React, { useState } from 'react'
import './Filter.css'

export const Filter = ({
  onFilter,
  availableColors,
  availableAges,
  availableBreeds,
  availablePrices,
  availableSpecies,
  availableAdoptionStatus,
  availableGender,
}) => {
  const [filters, setFilters] = useState({
    age: "",
    color: "",
    breed: "",
    species: "",
    gender: "",
    adoptionStatus: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFiltes) => ({
      ...prevFiltes,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="filter container">
      <form onSubmit={handleSubmit} className="filter-form">
        <select
          name="color"
          onChange={handleChange}
          value={filters.color}
          className="filter-input-text"
        >
          <option value="" disabled>
            color
          </option>
          {availableColors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
        <select
          name="age"
          onChange={handleChange}
          value={filters.age}
          className="filter-input-text"
        >
          <option value="" disabled>
            age
          </option>
          {availableAges.map((age, index) => (
            <option key={index} value={age}>
              {age}
            </option>
          ))}
        </select>
        <select
          name="breed"
          onChange={handleChange}
          value={filters.age}
          className="filter-input-text"
        >
          <option value="" disabled>
            breed
          </option>
          {availableBreeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <select
          name="species"
          onChange={handleChange}
          value={filters.species}
          className="filter-input-text"
        >
          <option value="" disabled>
            species
          </option>
          {availableSpecies.map((species, index) => (
            <option key={index} value={species}>
              {species}
            </option>
          ))}
        </select>
        <select
          name="gender"
          onChange={handleChange}
          value={filters.gender}
          className="filter-input-text"
        >
          <option value="" disabled>
            gender
          </option>
          {availableGender.map((gender, index) => (
            <option key={index} value={gender}>
              {gender}
            </option>
          ))}
        </select>

        <select
          name="adoptionStatus"
          onChange={handleChange}
          value={filters.adoptionStatus}
          className="filter-input-text"
        >
          <option value="" disabled>
            adoption status
          </option>
          {availableAdoptionStatus.map((adoptionStatus, index) => (
            <option key={index} value={adoptionStatus}>
              {adoptionStatus}
            </option>
          ))}
        </select>
        <select
          name="price"
          onChange={handleChange}
          value={filters.price}
          className="filter-input-text"
        >
          <option value="" disabled>
            price
          </option>
          {availablePrices.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-select">
          Select
        </button>
      </form>
    </div>
  );
};
