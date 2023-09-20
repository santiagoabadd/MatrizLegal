import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ListCategorys() {
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      

      const token = localStorage.getItem('jwtToken');

      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Realiza la solicitud Axios con el encabezado de autorización
      const response = await axios.get('http://localhost:8080/category', { headers });

      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
  
      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      await axios.delete(`http://localhost:8080/category/${id}`, { headers });
      loadCategories();
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Categoría</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{category.category}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editcategory/${category.categoryId}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCategory(category.categoryId)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}