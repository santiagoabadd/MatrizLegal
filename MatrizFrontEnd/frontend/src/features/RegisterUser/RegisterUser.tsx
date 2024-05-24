import "./RegisterUser.css";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ValidatedTextInput } from "../../components/ValidatedInput/ValidatedTextInput";
import { ValidatedSelectInput } from "../../components/ValidatedInput/ValidatedSelectInput";

export const RegisterUser: React.FC = () => {

  let navigate = useNavigate();

  interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }

  interface UserObjeto {
    username: string;
  }

  const [loadedUser, setLoadedUser] = useState<UserObjeto | null>(null);
  

  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

 

  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${userData.email}`, { headers });
    setLoadedUser(result.data);
  };



  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({

      ...userData,
      [name]: value,

    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    
    await axios.post('http://localhost:8080/auth/register', userData, { headers });

    try {
        loadUser();
        console.log("Correo de verificación enviado correctamente:");
    } catch (error) {
        
        console.error("Error al enviar el correo de verificación:", error);
    }

    try {
        const response = await axios.post('http://localhost:8080/auth/email/code', { username: loadedUser?.username});
       
        console.log("Correo de verificación enviado correctamente:", response.data);
    } catch (error) {
       
        console.error("Error al enviar el correo de verificación:", error);
    }

    navigate('/requisitos');
  };





  return (
    <div className="crear-user">
      <h2 className="crear-user-header">Crear un nuevo user</h2>
      <form className="crear-users-form-container" onSubmit={(e) => onSubmit(e)}>
        <div className="crear-users-form">
          <div className="crear-users-group">
            <div className="crear-users-unit-1">
              <ValidatedTextInput
                valid={true}
                name={"fistName"}
                label={"Nombre"}
                changeValue={onInputChange}

              />
            </div>
            <div className="crear-users-unit-2">
              <ValidatedTextInput
                valid={true}
                name={"lastName"}
                label={"Apellido"}
                changeValue={onInputChange}

              /></div>
            <div className="crear-users-unit-3">
              <ValidatedTextInput
                valid={true}
                name={"email"}
                label={"Email"}
                changeValue={onInputChange}
              /></div>

            <div className="crear-users-unit-4">
              <ValidatedTextInput
                valid={true}
                name={"password"}
                label={"Contraseña"}
                changeValue={onInputChange}
              /></div>
              <div className="crear-users-unit-5">
              <ValidatedTextInput
                valid={true}
                name={"phone"}
                label={"Telefono"}
                changeValue={onInputChange}
              /></div>
            

            
          </div>



          <div className="crear-users-button">
            <button type="submit" className="btn btn-primary">
              Registrar Usuario
            </button>
          </div>

        </div>
      </form >

      <div className="crear-users-footer"></div>
    </div >
  );
};
