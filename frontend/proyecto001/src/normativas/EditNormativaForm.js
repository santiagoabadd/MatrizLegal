import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditNormativaForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [normativaData, setNormativaData] = useState({
    precioBase: '',
    title: '',
    authority: '',
    category: '',
    organism: '',
    jurisdiction: '',
    current: true, 
  });

  useEffect(() => {
    loadNormativa();
  }, []);

  const token = localStorage.getItem('jwtToken');

      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };

  const loadNormativa = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/normativa/${id}`,{headers});
      setNormativaData(response.data);
    } catch (error) {
      console.error('Error loading normativa:', error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNormativaData({ ...normativaData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/normativa/${id}`, normativaData,{headers});
      navigate('/');
    } catch (error) {
      console.error('Error updating normativa:', error);
    }
  };

  return (
    <div>
      <h2>Editar Normativa</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="precioBase">Precio Base</label>
          <input
            type="text"
            className="form-control"
            name="precioBase"
            placeholder="Precio Base"
            value={normativaData.precioBase}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Titulo"
            value={normativaData.title}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="authority">Autoridad</label>
          <input
            type="text"
            className="form-control"
            name="authority"
            placeholder="Autoridad"
            value={normativaData.authority}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Categoría"
            value={normativaData.category}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="organism">Organismo</label>
          <input
            type="text"
            className="form-control"
            name="organism"
            placeholder="Organismo"
            value={normativaData.organism}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jurisdiction">Jurisdicción</label>
          <input
            type="text"
            className="form-control"
            name="jurisdiction"
            placeholder="Jurisdicción"
            value={normativaData.jurisdiction}
            onChange={onInputChange}
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="current"
            checked={normativaData.current}
            onChange={(e) =>
              setNormativaData({ ...normativaData, current: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="current">
            Actual
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Normativa
        </button>
      </form>
    </div>
  );
}






