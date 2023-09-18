import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddRubroForm() {
    let navigate = useNavigate();
  const [rubroData, setRubroData] = useState({
    rubro: '',
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRubroData({ ...rubroData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/rubro', rubroData); // Reemplaza la URL por la correcta
      // Manejar el éxito o redirigir a otra página si es necesario
      console.log('Rubro agregado exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error al agregar el rubro', error);
    }
  };

  return (
    <div>
      <h2>Añadir Rubro</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="rubro">Rubro</label>
          <input
            type="text"
            className="form-control"
            name="rubro"
            placeholder="Nombre del rubro"
            value={rubroData.rubro}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Añadir Rubro
        </button>
      </form>
    </div>
  );
}