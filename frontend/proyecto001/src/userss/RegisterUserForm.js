import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterUserForm() {
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    customerId:''
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const [customers, setCustomers] = useState([]);
  

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(userData);
      await axios.post('http://localhost:8080/auth/register', userData);
      
      // Redirige al usuario a la página de inicio de sesión después de registrarse
    } catch (error) {
      console.error('Error al registrar al usuario', error);
    }
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
      <h2>Registro de Usuario</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            placeholder="Nombre"
            value={userData.firstName}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Apellido"
            value={userData.lastName}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Correo Electrónico"
            value={userData.email}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Teléfono"
            value={userData.phone}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Contraseña"
            value={userData.password}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerId">Cliente</label>
          <select
            className="form-control"
            name="customerId"
            value={userData.customerId}
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
          Registrarse
        </button>
      </form>
    </div>
  );
}