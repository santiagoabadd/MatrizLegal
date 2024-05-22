import "./CrearCustomer.css";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ValidatedTextInput } from "../../components/ValidatedInput/ValidatedTextInput";

export const CrearCustomer: React.FC = () => {

  let navigate = useNavigate();

  interface CustomerData {
    company: string;
    enabled:boolean;
    rubroIds:number[];

  }



interface RubrosData {

    rubroId: string;
    rubro: string;
  
  }

  const [customerData, setCustomerData] = useState<CustomerData>({
    company: '',
    enabled: true,
    rubroIds: [0]

  });


  const [rubrosIdS, setRubrosIdS] = useState<string[]>([]);
  
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [rubros, setRubros] = useState<RubrosData[]>([]); 


  const fetchRubros = async () => {
    try {
      const rubroResponse = await axios.get('http://localhost:8080/rubro', { headers });
      setRubros(rubroResponse.data);
    } catch (error) {
      console.error('Error al obtener la lista de categorias', error);
    }
  };



  useEffect(() => {
   
    fetchRubros();
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerData({

      ...customerData,
      [name]: value,

    });
  };


  const onRubrosChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setRubrosIdS(selectedOptions);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
   
    const arrayDeNumeros2: number[] = rubrosIdS.map(str => parseInt(str, 10));
  
    customerData.rubroIds=arrayDeNumeros2;
    
   
    await axios.post('http://localhost:8080/customer', customerData, { headers });
    navigate('/home');
  };




  return (
    <div className="crear-customer">
      <h2 className="crear-customer-header">Crear un nuevo cliente</h2>
      <form className="crear-customers-form-container" onSubmit={(e) => onSubmit(e)}>
        <div className="crear-customers-form">
          <div className="crear-customers-group">
            <div className="crear-customers-unit-1">
              <ValidatedTextInput
                valid={true}
                name={"company"}
                label={"Nombre de la Compania"}
                changeValue={onInputChange}

              />
            </div>
            
             
            <div className="crear-customers-unit-7">
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
         



          <div className="crear-customers-button">
            <button type="submit" className="btn btn-primary">
              Añadir Cliente
            </button>
          </div>

        </div>
      </form >

      <div className="crear-customers-footer"></div>
    </div >
  );
};
