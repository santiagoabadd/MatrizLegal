import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddPlantForm() {
  let navigate = useNavigate();

  const [plantData, setPlantData] = useState({
    name: '',
    description: '',
    fechaAlta: '',
    jurisdiction: '',
    active: true,
    estado: '',
    customerId:''
  });

  const [customers, setCustomers] = useState([]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPlantData({ ...plantData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(plantData);
    await axios.post('http://localhost:8080/plant', plantData);
    navigate('/');
  };

  const fetchCustomers = async () => {
    try {
      const responseCustomer = await axios.get('http://localhost:8080/customer'); // Reemplaza la URL por la correcta
      setCustomers(responseCustomer.data); // Asigna la lista de plantas al estado
    } catch (error) {
      console.error('Error al obtener la lista de clientes', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Añadir Planta</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Nombre"
            value={plantData.name}
            onChange={(e) => onInputChange(e)}
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
            onChange={(e) => onInputChange(e)}
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
            onChange={(e) => onInputChange(e)}
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
            onChange={(e) => onInputChange(e)}
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
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Cliente</label>
          <select
            className="form-control"
            name="customerId"
            value={plantData.customerId}
            onChange={(e) => onInputChange(e)}
          >
            <option value="">Seleccionar cliente</option>
            {customers.map((customer) => (
              <option key={customer.customerId} value={customer.customerId}>
                {customer.company}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Añadir Planta
        </button>
      </form>
    </div>
  );
}