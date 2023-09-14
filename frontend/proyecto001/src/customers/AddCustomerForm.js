import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddCustomerForm() {
  let navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    company: '',
    enabled: false,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/customer', customerData); // Ajusta la URL según tus necesidades
    navigate('/');
  };

  return (
    <div>
      <h2>Añadir Cliente</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="company">Compañía</label>
          <input
            type="text"
            className="form-control"
            name="company"
            placeholder="Compañía"
            value={customerData.company}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="enabled"
            checked={customerData.enabled}
            onChange={(e) =>
              setCustomerData({ ...customerData, enabled: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="enabled">
            Habilitado
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Añadir Cliente
        </button>
      </form>
    </div>
  );
}