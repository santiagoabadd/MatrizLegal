import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditCustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customerData, setCustomerData] = useState({
    company: '',
    enabled: true, 
  });

  useEffect(() => {
    loadCustomer();
  }, []);

  const token = localStorage.getItem('jwtToken');

      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };

  const loadCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/customer/${id}`,{headers});
      setCustomerData(response.data);
    } catch (error) {
      console.error('Error loading customer:', error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/customer/${id}`, customerData,{headers});
      navigate('/');
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div>
      <h2>Editar Cliente</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="company">Compañía</label>
          <input
            type="text"
            className="form-control"
            name="company"
            placeholder="Compañía"
            value={customerData.company}
            onChange={onInputChange}
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
          Guardar Cliente
        </button>
      </form>
    </div>
  );
}