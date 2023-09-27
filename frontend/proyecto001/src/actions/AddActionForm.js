import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
export default function AddActionForm() {
    const { id } = useParams();
    let navigate = useNavigate();
  const [actionData, setActionData] = useState({
    title: '',
    description: '',
    fechaLimite: '',
    avance: '',
    responsable: '',
    estado: '',
  });

  const [requirementId, setRequirementId] = useState('');

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setActionData({ ...actionData, [name]: value });
  };

  const token = localStorage.getItem('jwtToken');

      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/requirement/${id}/addAction`, actionData,{headers});
      navigate('/')
      // Redireccionar o realizar alguna acción después de agregar la acción al requisito
    } catch (error) {
      console.error('Error adding action:', error);
    }
  };

  return (
    <div>
      <h2>Añadir Acción</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Título"
            value={actionData.title}
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
            value={actionData.description}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaLimite">Fecha Límite</label>
          <input
            type="date"
            className="form-control"
            name="fechaLimite"
            value={actionData.fechaLimite}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="avance">Avance</label>
          <input
            type="number"
            className="form-control"
            name="avance"
            placeholder="Avance"
            value={actionData.avance}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="responsable">Responsable</label>
          <input
            type="text"
            className="form-control"
            name="responsable"
            placeholder="Responsable"
            value={actionData.responsable}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            className="form-control"
            name="estado"
            placeholder="Estado"
            value={actionData.estado}
            onChange={onInputChange}
          />
        </div>

        

        <button type="submit" className="btn btn-primary">
          Añadir Acción al Requisito
        </button>
      </form>
    </div>
  );
}