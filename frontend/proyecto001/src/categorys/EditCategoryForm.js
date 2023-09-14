import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditCategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoryData, setCategoryData] = useState({
    category: '',
  });

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/category/${id}`);
      setCategoryData(response.data);
    } catch (error) {
      console.error('Error loading category:', error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/category/${id}`, categoryData);
      navigate('/categories');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div>
      <h2>Editar Categoría</h2>
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
          Guardar Categoría
        </button>
      </form>
    </div>
  );
}