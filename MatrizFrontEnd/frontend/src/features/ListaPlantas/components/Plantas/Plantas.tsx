import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "./Plantas.css"


  

 

  export const Plantas: React.FC = () => {


    interface plantaObjeto {
      plantId:number;  
      name: string;
      description: string;
      fechaAlta: Date;
      jurisdiction: string;
      active: boolean;
      estado: string;
    }

    const [plants, setPlants] = useState<plantaObjeto[]>([]);

    const { id } = useParams();

    useEffect(() => {
      loadPlants();
    }, []);

  const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

  const loadPlants = async () => {
    try {
      const response = await axios.get("http://localhost:8080/plant",{headers});
      setPlants(response.data);
    } catch (error) {
      console.error("Error al cargar las plantas:", error);
    }
  };



  const deletePlant = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/plant/${id}`);
      loadPlants();
    } catch (error) {
      console.error("Error al eliminar la planta:", error);
    }
  };

  return (
    <div className="plantas-container">
      <div className="plantas-header-group">
        <h4>Listado de Plantas</h4>
        </div> 
        <table className="plantas-table">
          <thead>
            <tr>
              <th className="planta-table-headitem-name" scope="col">Nombre</th>
              <th className="planta-table-headitem" scope="col">Descripción</th>
              <th className="planta-table-headitem" scope="col">Fecha de Alta</th>
              <th className="planta-table-headitem" scope="col">Jurisdicción</th>
              <th className="planta-table-headitem" scope="col">Activo</th>
              <th className="planta-table-headitem" scope="col">Estado</th> 
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, index) => (
              <tr className="planta-table-row" key={plant.plantId}>
                <td className="planta-table-item-name">{plant.name}</td>
                <td className="planta-table-item">{plant.description}</td>
                <td className="planta-table-item">{plant.fechaAlta instanceof Date
                    ? plant.fechaAlta.toDateString()
                    : new Date(plant.fechaAlta).toDateString()}</td>
                <td className="planta-table-item">{plant.jurisdiction}</td>
                <td className="planta-table-item">{plant.active ? 'Activo' : 'Inactivo'}</td>
                <td className="planta-table-item">{plant.estado}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
}