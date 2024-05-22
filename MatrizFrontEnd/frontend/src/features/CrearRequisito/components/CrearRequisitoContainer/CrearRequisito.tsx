import "./CrearRequisito.css";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import { ValidatedSelectInput } from "../../../../components/ValidatedInput/ValidatedSelectInput";

export const CrearRequisito: React.FC = () => {

  let navigate = useNavigate();

  interface RequirementData {
    title: string;
    actualState: string;
    requirement: string;
    type: string;
    compliance: string;
    relevance: string;
    plantId: string;
    categoryId: string;

  }

  interface PlantData {

    plantId: string;
    name: string;

  }
  interface CategoryData {

    categoryId: string;
    category: string;

  }

  const [requirementData, setRequirementData] = useState<RequirementData>({
    actualState: '',
    compliance: '',
    relevance: '',
    requirement: '',
    title: '',
    type: '',
    plantId: '',
    categoryId: '',

  });

  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [plants, setPlants] = useState<PlantData[]>([]);
  const [categorys, setCategorys] = useState<CategoryData[]>([]);


  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/plant', { headers });
      setPlants(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de plantas', error);
    }
  };

  const fetchCategorys = async () => {
    try {
      const caregoryResponse = await axios.get('http://localhost:8080/category', { headers });
      setCategorys(caregoryResponse.data);
    } catch (error) {
      console.error('Error al obtener la lista de categorias', error);
    }
  };

  useEffect(() => {
    fetchPlants();
    fetchCategorys();
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
    await axios.post('http://localhost:8080/requirement', requirementData, { headers });
    navigate('/requisitos');
  };





  return (
    <div className="crear-requisito">
      <h2 className="crear-requisito-header">Crear un nuevo requisito</h2>
      <form className="crear-requisitos-form-container" onSubmit={(e) => onSubmit(e)}>
        <div className="crear-requisitos-form">
          <div className="crear-requisitos-group">
            <div className="crear-requisitos-unit-1">
              <ValidatedTextInput
                valid={true}
                name={"title"}
                label={"Titulo"}
                changeValue={onInputChange}

              />
            </div>
            <div className="crear-requisitos-unit-2">
              <ValidatedTextInput
                valid={true}
                name={"actualState"}
                label={"Estado actual"}
                changeValue={onInputChange}

              /></div>
            <div className="crear-requisitos-unit-3">
              <ValidatedTextInput
                valid={true}
                name={"requirement"}
                label={"Requisito"}
                changeValue={onInputChange}
              /></div>

            <div className="crear-requisitos-unit-4">
              <select className="validated-input-select"
                name="compliance"
                value={requirementData.compliance}
                onChange={onInputChange}
              >
                <option className="validated-input-select-option"
                  value="">Selecciona el cumplimiento</option>
                <option value="No evaluado">No evaluado</option>
                <option value="Nulo">Nulo</option>
                <option value="Total">Total</option>
                <option value="En tramite">En tramite</option>
                <option value="Parcial">Parcial</option>
                <option value="Parcial">No Aplica</option>
              </select></div>
            <div className="crear-requisitos-unit-5">
            <select className="validated-input-select"
                name="relevance"
                value={requirementData.relevance}
                onChange={onInputChange}
              >
                <option className="validated-input-select-option"
                  value="">Selecciona la relevancia</option>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                
              </select></div>

            <div className="crear-requisitos-unit-6">
              <select className="validated-input-select"
                name="categoryId"
                value={requirementData.categoryId}
                onChange={onInputChange}

              >
                <option className="validated-input-select-option"
                  value="">Selecciona una categoria</option>

                {categorys.map((category, index) => (
                  <option value={category.categoryId}>{category.category}</option>
                ))}


              </select>
            </div>
            <div className="crear-requisitos-unit-7">
              <select className="validated-input-select"
                name="plantId"
                value={requirementData.plantId}
                onChange={onInputChange}

              >
                <option className="validated-input-select-option"
                  value="">Selecciona una planta</option>

                {plants.map((plant, index) => (
                  <option value={plant.plantId}>{plant.name}</option>
                ))}


              </select>
            </div>
            <div className="crear-requisitos-unit-8">
              <select className="validated-input-select"
                name="type"
                value={requirementData.type}
                onChange={onInputChange}
              >
                <option className="validated-input-select-option"
                  value="">Selecciona un tipo</option>
                <option value="Corporativo">Corporativo</option>
                <option value="Legal">Legal</option>
                <option value="Sustentabilidad">Sustentabilidad</option>
              </select>
            </div>
          </div>



          <div className="crear-requisitos-button">
            <button type="submit" className="btn btn-primary">
              Añadir Requerimiento
            </button>
          </div>

        </div>
      </form >

      <div className="crear-requisitos-footer"></div>
    </div >
  );
};
