import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginUserForm() {
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    password: ''
   
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

      
      console.log(userData);
      const response=await axios.post('http://localhost:8080/auth/login', userData);

      
      console.log("asdasfas");
        // Guarda el token en el almacenamiento local
        const { token } = response.data;
        console.log(response);
        localStorage.setItem('jwtToken', token);

        // Redirige al usuario o realiza acciones necesarias después de iniciar sesión
         // Ejemplo de redirección a una página de dashboard
      
     
    
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Usuario"
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

        

        

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}