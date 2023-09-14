import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddCategoryForm() {
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    category: '',
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/category', categoryData);
      navigate('/categories');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <h2>Agregar Categoría</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Categoría"
            value={categoryData.category}
            onChange={onInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Categoría
        </button>
      </form>
    </div>
  );
}