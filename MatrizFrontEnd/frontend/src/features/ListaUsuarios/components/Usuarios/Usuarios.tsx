import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "./Usuarios.css"


  

 

  export const Usuarios: React.FC = () => {


    interface usuarioObjeto {
      userId:number;  
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      enabled: boolean;
      
    }

    const [users, setUsers] = useState<usuarioObjeto[]>([]);

    const { id } = useParams();

    useEffect(() => {
      loadUsers();
    }, []);

  const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user",{headers});
      setUsers(response.data);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };



 

  return (
    <div className="usuarios-container">
      <div className="usuarios-header-group">
        <h4>Listado de usuarios</h4>
        </div> 
        <table className="usuarios-table">
          <thead>
            <tr>
              <th className="usuario-table-headitem-name" scope="col">Nombre</th>
              <th className="usuario-table-headitem" scope="col">Apellido</th>
              <th className="usuario-table-headitem" scope="col">Username</th>
              <th className="usuario-table-headitem" scope="col">Mail</th>
              <th className="usuario-table-headitem" scope="col">Telefono</th>
              <th className="usuario-table-headitem" scope="col">Activo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="usuario-table-row" key={user.userId}>
                <td className="usuario-table-item-name">{user.firstName}</td>
                <td className="usuario-table-item">{user.lastName}</td>
                <td className="usuario-table-item">{user.username}</td>
                <td className="usuario-table-item">{user.email}</td>
                <td className="usuario-table-item">{user.phone}</td>
                <td className="usuario-table-item">{user.enabled ? 'Activo' : 'Inactivo'}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
}