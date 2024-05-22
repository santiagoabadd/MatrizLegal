import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import "./CrearAccion.css";

interface CrearAccionProps {
  idRequisito: string;
}
export const CrearAccion: React.FC<CrearAccionProps> = ({ idRequisito }) => {
  let navigate = useNavigate();
  interface AccionData {
    title: string;
    description: string;
    fechaLimite: Date;
    avance: number;
    responsable: string;
    estado: string;
    requirementId: string;
  }

  const [accionData, setAccionData] = useState<AccionData>({
    title: '',
    description: '',
    fechaLimite: new Date(),
    avance: 0,
    responsable: '',
    estado: '',
    requirementId: '',
  });

  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };


  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccionData({
      ...accionData,
      [name]: value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(accionData);
    await axios.post(`http://localhost:8080/requirement/${idRequisito}/addAction`, accionData, { headers }); 
    navigate("/home")
  };

  return (
    <div className="crear-accion">
      <h2 className="crear-accion-header">Añadir Accion</h2>
      <form className="crear-acciones-form-container" onSubmit={(e) => onSubmit(e)}>
        <div className="crear-acciones-form">
          <div className="crear-acciones-group">
            <div className="crear-acciones-unit-1">
              <ValidatedTextInput
                valid={true}
                name={"title"}
                label={"Titulo"}
                changeValue={onInputChange}

              />
            </div>
            <div className="crear-acciones-unit-2">
              <div className='crear-acciones-fecha'>
              <input
            type="date"
            className="form-control-fecha"
            name="fechaLimite"
            onChange={onInputChange}
          />
              </div>
            </div>
            <div className="crear-acciones-unit-3">
              <ValidatedTextInput
                valid={true}
                name={"description"}
                label={"Descripcion"}
                changeValue={onInputChange}

              /></div>
           
              
            <div className="crear-acciones-unit-4">
              <ValidatedTextInput
                valid={true}
                name={"avance"}
                label={"Avance"}
                changeValue={onInputChange}
              /></div>
            <div className="crear-acciones-unit-5">
              <ValidatedTextInput
                valid={true}
                name={"responsable"}
                label={"Responsable"}
                changeValue={onInputChange}
              /></div>

            <div className="crear-acciones-unit-6">
              <ValidatedTextInput
                valid={true}
                name={"estado"}
                label={"Estado"}
                changeValue={onInputChange}
              /></div>
            
            
          </div>
        
        <div className="crear-acciones-button">
          <button type="submit" className="btn btn-primary">
            Añadir Accion
          </button>
        </div>
    </div>
          
      </form >

  <div className="crear-acciones-footer"></div>
    </div >
  );
};