import "./EditarRequisito.css";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EditValidatedTextInput } from "../../../../components/ValidatedInput/EditValidatedTextInput";

interface EditarRequisitoProps{
    idRequirement: string;
}



export const EditarRequisito: React.FC<EditarRequisitoProps> = ({idRequirement}) => {

  let navigate = useNavigate();

  interface RequirementData {
    requirementId: number;
    title: string;
    actualState: string;
    requirement: string;
    type: string;
    compliance: string;
    relevance: string;
    plant:{
        plantId:number;
    }
    customer:{
        customerId:number;
    }
    category: {
        categoryId: number;
    }

  }



  const [requirementData, setRequirementData] = useState<RequirementData>({
    requirementId:0,
    actualState: '',
    compliance: '',
    relevance: '',
    requirement: '',
    title: '',
    type: '',
    plant:{
        plantId:0
    },
    category: {
        categoryId: 0
      },
      customer:{
        customerId:0
    }

  });

  const token = localStorage.getItem('token');

  // Configura un objeto de cabecera con el token JWT
  const headers = {
    Authorization: `Bearer ${token}`,
  };

 
  const loadRequirement = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/requirement/${idRequirement}`, { headers });
        const requirementDataFromApi: RequirementData = result.data; 
        setRequirementData(requirementDataFromApi);
        console.log(requirementDataFromApi)
        

    } catch (error) {
        console.error('Error loading requirement:', error);
    }
};
  

  useEffect(() => {
    loadRequirement();
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequirementData({

      ...requirementData,
      [name]: value,

    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(requirementData);
    await axios.put(`http://localhost:8080/requirement/${requirementData.requirementId}`, requirementData, { headers });
    navigate('/requisitos');
  };


  return (
    <div className="crear-requisito">
      <h2 className="crear-requisito-header">Editar requisito</h2>
      <form className="crear-requisitos-form-container" onSubmit={(e) => onSubmit(e)}>
        <div className="crear-requisitos-form">
          <div className="crear-requisitos-group">
            <div className="crear-requisitos-unit-1">
              <EditValidatedTextInput
                valid={true}
                name={"title"}
                label={"Titulo"}
                changeValue={onInputChange}
                data={requirementData.title}

              />
            </div>
            <div className="crear-requisitos-unit-2">
              <EditValidatedTextInput
                valid={true}
                name={"actualState"}
                label={"Estado actual"}
                changeValue={onInputChange}
                data={requirementData.actualState}
              /></div>
            <div className="crear-requisitos-unit-3">
              <EditValidatedTextInput
                valid={true}
                name={"requirement"}
                label={"Requisito"}
                changeValue={onInputChange}
                data={requirementData.requirement}
              /></div>

            <div className="crear-requisitos-unit-4">
              <EditValidatedTextInput
                valid={true}
                name={"compliance"}
                label={"Cumplimiento"}
                changeValue={onInputChange}
                data={requirementData.compliance}
              /></div>
            <div className="crear-requisitos-unit-5">
              <EditValidatedTextInput
                valid={true}
                name={"relevance"}
                label={"Relevancia"}
                changeValue={onInputChange}
                data={requirementData.relevance}
              /></div>

            <div className="crear-requisitos-unit-6">
              <EditValidatedTextInput
                valid={true}
                name={"categoryId"}
                label={"Categoria"}
                changeValue={onInputChange}
                data={requirementData.category.categoryId.toString()}
              /></div>
            <div className="crear-requisitos-unit-7">
              <EditValidatedTextInput
                valid={true}
                name={"plantId"}
                label={"Planta"}
                changeValue={onInputChange}
                data={requirementData.plant.plantId.toString()}
              /></div>
            <div className="crear-requisitos-unit-8">
              <EditValidatedTextInput
                valid={true}
                name={"type"}
                label={"Tipo"}
                changeValue={onInputChange}
                data={requirementData.type}
              /></div>
          </div>
        
        <div className="crear-requisitos-button">
          <button type="submit" className="btn btn-primary">
            Editar Requerimiento
          </button>
        </div>
    </div>
          
      </form >

  <div className="crear-requisitos-footer"></div>
    </div >
  );
};
