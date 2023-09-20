import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
  const [normativas, setNormativas] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadNormativas();
  }, []);

  const token = localStorage.getItem('jwtToken');

      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };

  const loadNormativas = async () => {
    const result = await axios.get('http://localhost:8080/normativa',{headers});
    setNormativas(result.data);
  };

  const deleteNormativa = async (id) => {
    await axios.delete(`http://localhost:8080/normativa/${id}`,{headers});
    loadNormativas();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Precio Base</th>
              <th scope="col">Titulo</th>
              <th scope="col">Autoridad</th>
              <th scope="col">Organismo</th>
              <th scope="col">Jurisdicción</th>
              <th scope="col">Actual</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {normativas.map((normativa, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{normativa.precioBase}</td>
                <td>{normativa.title}</td>
                <td>{normativa.authority}</td>
                <td>{normativa.organism}</td>
                <td>{normativa.jurisdiction}</td>
                <td>{normativa.current ? 'Sí' : 'No'}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewnormativa/${normativa.normativaId}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editnormativa/${normativa.normativaId}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteNormativa(normativa.normativaId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}