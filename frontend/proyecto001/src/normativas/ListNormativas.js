import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
  const [normativas, setNormativas] = useState([]);
  const [filtroNorma, setFiltroNorma] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroOrganismo, setFiltroOrganismo] = useState('');
  const [filtroJurisdiccion, setFiltroJurisdiccion] = useState('');
  const [filtroCurrent, setFiltroCurrent] = useState(null); // Estado inicial: null

  const { id } = useParams();

  useEffect(() => {
    loadNormativas();
  }, [filtroNorma, filtroTitulo, filtroCategoria, filtroOrganismo, filtroJurisdiccion, filtroCurrent]);

  const token = localStorage.getItem('jwtToken');

  // Configura un objeto de cabecera con el token JWT
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const loadNormativas = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/normativas`,
        {
          params: {
            partialNorma: filtroNorma,
            partialTitle: filtroTitulo,
            partialCategoria: filtroCategoria,
            partialOrganismo: filtroOrganismo,
            partialJurisdiccion: filtroJurisdiccion,
            partialCurrent: filtroCurrent !== null ? filtroCurrent : '', // Si es null, envía una cadena vacía
          },
          headers,
        }
      );
      setNormativas(result.data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const deleteNormativa = async (id) => {
    await axios.delete(`http://localhost:8080/normativa/${id}`, { headers });
    loadNormativas();
  };

  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    switch (name) {
      case 'filtroNorma':
        setFiltroNorma(value);
        break;
      case 'filtroTitulo':
        setFiltroTitulo(value);
        break;
      case 'filtroCategoria':
        setFiltroCategoria(value);
        break;
      case 'filtroOrganismo':
        setFiltroOrganismo(value);
        break;
      case 'filtroJurisdiccion':
        setFiltroJurisdiccion(value);
        break;
      case 'filtroCurrent':
        // Cambia el estado solo si el valor no es null
        setFiltroCurrent(value !== 'null' ? value : null);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por norma"
          name="filtroNorma"
          value={filtroNorma}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Filtrar por título"
          name="filtroTitulo"
          value={filtroTitulo}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Filtrar por categoría"
          name="filtroCategoria"
          value={filtroCategoria}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Filtrar por organismo"
          name="filtroOrganismo"
          value={filtroOrganismo}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Filtrar por jurisdicción"
          name="filtroJurisdiccion"
          value={filtroJurisdiccion}
          onChange={handleFilterChange}
        />
        <select
          name="filtroCurrent"
          value={filtroCurrent !== null ? filtroCurrent : 'null'} // Valor por defecto 'null'
          onChange={handleFilterChange}
        >
          <option value="null">Seleccionar</option>
          <option value="true">Actual: Sí</option>
          <option value="false">Actual: No</option>
        </select>
      </div>

      <div className="py-4">
        <table className="table">
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Norma</th>
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
                <td>{normativa.norma}</td>
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