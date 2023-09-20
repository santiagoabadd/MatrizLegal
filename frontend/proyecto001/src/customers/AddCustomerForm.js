import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddCustomerForm() {
  let navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    company: '',
    enabled: false,
    rubroIds: [], // Agrega un campo para almacenar los IDs de los rubros seleccionados
  });

  const [rubros, setRubros] = useState([]); // Almacena la lista de rubros disponibles

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setCustomerData({ ...customerData, [name]: checked });
    } else if (type === 'select-multiple') {
      const selectedRubroIds = Array.from(e.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setCustomerData({ ...customerData, [name]: selectedRubroIds });
    } else {
      setCustomerData({ ...customerData, [name]: value });
    }
  };

  const token = localStorage.getItem('jwtToken');

      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/customer', customerData,{headers}); // Ajusta la URL según tus necesidades
    navigate('/');
  };

  const fetchRubros = async () => {
    try {
      const responseRubros = await axios.get('http://localhost:8080/rubro',{headers}); // Reemplaza la URL por la correcta
      setRubros(responseRubros.data); // Asigna la lista de rubros al estado
    } catch (error) {
      console.error('Error al obtener la lista de rubros', error);
    }
  };

  useEffect(() => {
    fetchRubros();
  }, []);

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

        <div className="form-group">
          <label htmlFor="rubroIds">Rubros</label>
          <select
            multiple
            className="form-control"
            name="rubroIds"
            value={customerData.rubroIds}
            onChange={(e) => onInputChange(e)}
          >
            {rubros.map((rubro) => (
              <option key={rubro.rubroId} value={rubro.rubroId}>
                {rubro.rubro}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Añadir Cliente
        </button>
      </form>
    </div>
  );
}