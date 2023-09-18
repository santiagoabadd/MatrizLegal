import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterUserForm() {
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    authoritie: 'USER', // Valor predeterminado: 'user'
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(userData);
      await axios.post('http://localhost:8080/user', userData);
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión después de registrarse
    } catch (error) {
      console.error('Error al registrar al usuario', error);
    }
  };

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
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Nombre de Usuario"
            value={userData.username}
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
          <label htmlFor="authority">Autoridad</label>
          <select
            className="form-control"
            name="authority"
            value={userData.authority}
            onChange={(e) => onInputChange(e)}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        

        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
}