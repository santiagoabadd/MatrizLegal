import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditPlantForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [plantData, setPlantData] = useState({
    name: '',
    description: '',
    fechaAlta: '',
    jurisdiction: '',
    active: true,
    estado: '',
  });

  const token = localStorage.getItem('jwtToken');

      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };

  useEffect(() => {
    loadPlant();
  }, []);

  const loadPlant = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/plant/${id}`,{headers});
      setPlantData(response.data);
    } catch (error) {
      console.error('Error loading plant:', error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPlantData({ ...plantData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/plant/${id}`, plantData,{headers});
      navigate('/');
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  return (
    <div>
      <h2>Editar Planta</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Nombre"
            value={plantData.name}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Descripción"
            value={plantData.description}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaAlta">Fecha de Alta</label>
          <input
            type="date"
            className="form-control"
            name="fechaAlta"
            placeholder="Fecha de Alta"
            value={plantData.fechaAlta}
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
            value={plantData.jurisdiction}
            onChange={onInputChange}
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="active"
            checked={plantData.active}
            onChange={(e) =>
              setPlantData({ ...plantData, active: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="active">
            Activo
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            className="form-control"
            name="estado"
            placeholder="Estado"
            value={plantData.estado}
            onChange={onInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Planta
        </button>
      </form>
    </div>
  );
}