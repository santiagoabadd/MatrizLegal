import "./CrearPlanta.css";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ValidatedTextInput } from "../../components/ValidatedInput/ValidatedTextInput";


export const CrearPlant: React.FC = () => {

  let navigate = useNavigate();

  interface PlantData {
    description: string;
    jurisdiction: string;
    name: string;
    estado: string;
    fechaAlta: Date;
    active: boolean;

  }

  




  const [plantData, setPlantData] = useState<PlantData>({
    description: '',
    jurisdiction: '',
    name:'',
    estado: '',
    fechaAlta:new Date(),
    active: true,
   

  });


  const token = localStorage.getItem('token');


  const headers = {
    Authorization: `Bearer ${token}`,
  };





  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlantData({
      ...plantData,
      [name]: value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(plantData);
    await axios.post(`http://localhost:8080/plant`, plantData, { headers }); 
    navigate("/plant")
  };




  return (
    <div className="crear-plant">
      <h2 className="crear-plant-header">Crear una nueva planta</h2>
      <form className="crear-plants-form-container" onSubmit={(e) => onSubmit(e)}>
        <div className="crear-plants-form">
          <div className="crear-plants-group">
            <div className="crear-plants-unit-1">
              <ValidatedTextInput
                valid={true}
                name={"name"}
                label={"Nombre"}
                changeValue={onInputChange}

              />
            </div>
            <div className="crear-plants-unit-2">
              <ValidatedTextInput
                valid={true}
                name={"description"}
                label={"Descripccion"}
                changeValue={onInputChange}

              /></div>
            <div className="crear-plants-unit-3">
              <ValidatedTextInput
                valid={true}
                name={"jurisdiction"}
                label={"Jurisdiccion"}
                changeValue={onInputChange}
              /></div>

            <div className="crear-plants-unit-4">
              <ValidatedTextInput
                valid={true}
                name={"estado"}
                label={"Estado"}
                changeValue={onInputChange}
              /></div>
            <div className="crear-acciones-unit-2">
              <div className='crear-acciones-fecha'>
              <input
            type="date"
            className="form-control-fecha"
            name="fechaAlta"
            onChange={onInputChange}
          />
              </div>
            </div>
            
            
             
            
          </div>
         



          <div className="crear-plants-button">
            <button type="submit" className="btn btn-primary">
              Añadir Requerimiento
            </button>
          </div>

        </div>
      </form >

      <div className="crear-plants-footer"></div>
    </div >
  );
};
