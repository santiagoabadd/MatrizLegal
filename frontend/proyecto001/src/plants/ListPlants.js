import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ListPlants() {
  const [plants, setPlants] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const response = await axios.get("http://localhost:8080/plant");
      setPlants(response.data);
    } catch (error) {
      console.error("Error al cargar las plantas:", error);
    }
  };

  const deletePlant = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/plant/${id}`);
      loadPlants();
    } catch (error) {
      console.error("Error al eliminar la planta:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2>Listado de Plantas</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Fecha de Alta</th>
              <th scope="col">Jurisdicción</th>
              <th scope="col">Activo</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, index) => (
              <tr key={plant.plantId}>
                <th scope="row">{index + 1}</th>
                <td>{plant.name}</td>
                <td>{plant.description}</td>
                <td>{plant.fechaAlta}</td>
                <td>{plant.jurisdiction}</td>
                <td>{plant.active ? 'Activo' : 'Inactivo'}</td>
                <td>{plant.estado}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/plant/${plant.plantId}`}
                  >
                    Ver
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editplant/${plant.plantId}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deletePlant(plant.plantId)}
                  >
                    Eliminar
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