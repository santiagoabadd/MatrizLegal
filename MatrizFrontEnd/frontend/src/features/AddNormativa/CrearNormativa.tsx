import "./CrearNormativa.css";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ValidatedTextInput } from "../../components/ValidatedInput/ValidatedTextInput";

export const CrearNormativa: React.FC = () => {

  let navigate = useNavigate();

  interface NormativaData {
    norma: string;
    jurusdiction: string;
    organism: string;
    title: string;
    authority: string;
    current: boolean;
    categoryIds: number[]; 
    rubrosIds:number[];

  }

  




interface CategoryData {

  categoryId: string;
  category: string;

}

interface RubrosData {

    rubroId: string;
    rubro: string;
  
  }

  const [normativaData, setNormativaData] = useState<NormativaData>({
    norma: '',
    jurusdiction: '',
    organism:'',
    title: '',
    authority:'',
    current: true,
    categoryIds: [0],
    rubrosIds: [0]

  });

  const [categoriesIdS, setCategoriesIdS] = useState<string[]>([]);

  const [rubrosIdS, setRubrosIdS] = useState<string[]>([]);
  
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [categorys, setCategorys] = useState<CategoryData[]>([]); 
  const [rubros, setRubros] = useState<RubrosData[]>([]); 



  const fetchCategorys = async () => {
    try {
      const caregoryResponse = await axios.get('http://localhost:8080/category', { headers });
      setCategorys(caregoryResponse.data);
    } catch (error) {
      console.error('Error al obtener la lista de categorias', error);
    }
  };
  const fetchRubros = async () => {
    try {
      const rubroResponse = await axios.get('http://localhost:8080/rubro', { headers });
      setRubros(rubroResponse.data);
    } catch (error) {
      console.error('Error al obtener la lista de categorias', error);
    }
  };



  useEffect(() => {
    fetchCategorys();
    fetchRubros();
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNormativaData({

      ...normativaData,
      [name]: value,

    });
  };

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setCategoriesIdS(selectedOptions);
  };

  const onRubrosChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setRubrosIdS(selectedOptions);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const arrayDeNumeros: number[] = categoriesIdS.map(str => parseInt(str, 10));
    const arrayDeNumeros2: number[] = rubrosIdS.map(str => parseInt(str, 10));
    normativaData.categoryIds=arrayDeNumeros;
    normativaData.rubrosIds=arrayDeNumeros2;
    console.log(normativaData);
   
    await axios.post('http://localhost:8080/normativa', normativaData, { headers });
    navigate('/normativas');
  };




  return (
    <div className="crear-normativa">
      <h2 className="crear-normativa-header">Crear una nueva normativa</h2>
      <form className="crear-normativas-form-container" onSubmit={(e) => onSubmit(e)}>
        <div className="crear-normativas-form">
          <div className="crear-normativas-group">
            <div className="crear-normativas-unit-1">
              <ValidatedTextInput
                valid={true}
                name={"norma"}
                label={"Norma"}
                changeValue={onInputChange}

              />
            </div>
            <div className="crear-normativas-unit-2">
              <ValidatedTextInput
                valid={true}
                name={"title"}
                label={"Titulo"}
                changeValue={onInputChange}

              /></div>
            <div className="crear-normativas-unit-3">
              <ValidatedTextInput
                valid={true}
                name={"jurisdiction"}
                label={"Jurisdiccion"}
                changeValue={onInputChange}
              /></div>

            <div className="crear-normativas-unit-4">
              <ValidatedTextInput
                valid={true}
                name={"authority"}
                label={"Autoridad"}
                changeValue={onInputChange}
              /></div>

            <div className="crear-normativas-unit-5">
              <ValidatedTextInput
                valid={true}
                name={"organism"}
                label={"Organismo"}
                changeValue={onInputChange}
              /></div>
             <div className="crear-normativas-unit-6">
              <select className="validated-input-select-m"
                name="categoryId"
                value={categoriesIdS}
                onChange={onCategoryChange}
                multiple

              >
                <option className="validated-input-select-option"
                  value="">Selecciona una categoria</option>

                {categorys.map((category, index) => (
                  <option value={category.categoryId}>{category.category}</option>
                ))}


              </select>
            </div>

            <div className="crear-normativas-unit-7">
              <select className="validated-input-select-m"
                name="rubroId"
                value={rubrosIdS}
                onChange={onRubrosChange}
                multiple

              >
                <option className="validated-input-select-option"
                  value="">Seleccione los rubros</option>

                {rubros.map((rubro, index) => (
                  <option value={rubro.rubroId}>{rubro.rubro}</option>
                ))}


              </select>
            </div>
            
          </div>
         



          <div className="crear-normativas-button">
            <button type="submit" className="btn btn-primary">
              Añadir Normativa
            </button>
          </div>

        </div>
      </form >

      <div className="crear-normativas-footer"></div>
    </div >
  );
};
