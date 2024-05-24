
import "./Stats.css"
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import DonutChart from "../../../../components/DonutChart/DonutChart";
import { useNavigate } from 'react-router-dom';

interface accionObjeto {
  actionId: number;
  title: string;
  description: string;
  fechaLimite: Date;
  avance: number;
  responsable: string;
  estado: string;
  
  requirement: {

    requirementId: number;
    plant:{
      name:string;
    }
    

    };

    
}


interface requisitoObjeto {
  requirementId:number;
  title: string;
  actualState: boolean;
  requirement: string;
  type: string;
  compliance: string;
  relevance: string;
  category: {
   
    category: string;
    tipo: string;
  },
  plant:{
    name:string;
  }

}




const Stats: React.FC = () => {

  let navigate = useNavigate();

    const [categoryData, setCategoryData] = useState<Object[][]>([]);
    const [typeData, setTypeData] = useState<Object[][]>([]);
    const [complianceData, setComplianceData] = useState<Object[][]>([]);
    const [stateData, setStateData] = useState<Object[][]>([]);
    const [actionsData, setActionsData] = useState<Object[][]>([]);
    const [ShowRequirements, setShowRequirements] = useState<boolean>(false);
    const [ShowActions, setShowActions] = useState<boolean>(false);
    const [requirements, setRequirements] = useState<requisitoObjeto[]>([]);
    const [loadedAction, setLoadedAction] = useState<accionObjeto[]>([]);

    
    
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const loadRequirements = async () => {
        const result = await axios.get("http://localhost:8080/requirement",{headers});
        setRequirements(result.data);
      };

      const loadActions = async () => {
        try {
          const result = await axios.get(`http://localhost:8080/action`, { headers });
          setLoadedAction(result.data);
        } catch (error) {
          console.error("Error al cargar las plantas:", error);
        }
      };
    

      const fetchRequirementsPerCategory = async () => {
        try {
          const response = await axios.get('http://localhost:8080/requirement/categoryCount', { headers });
          const data: Object[][] = response.data;
        setCategoryData(data);
        
        } catch (error) {
          console.error('Error al obtener la lista ', error);
        }
      };

      const fetchActionsInfo = async () => {
        try {
          const response = await axios.get('http://localhost:8080/action/actionInfoCount', { headers });
          const data: Object[][] = response.data;
        setActionsData(data);
        
        } catch (error) {
          console.error('Error al obtener la lista ', error);
        }
      };

      const fetchRequirementsPerType = async () => {
        try {
          const response = await axios.get('http://localhost:8080/requirement/typeCount', { headers });
          const data: Object[][] = response.data;
        setTypeData(data);
        
        } catch (error) {
          console.error('Error al obtener la lista ', error);
        }
      };

      const fetchRequirementsPerState = async () => {
        try {
          const response = await axios.get('http://localhost:8080/requirement/stateCount', { headers });
          const data: Object[][] = response.data;
        setStateData(data);
        
        } catch (error) {
          console.error('Error al obtener la lista ', error);
        }
      };

      const fetchRequirementsPerCompliance = async () => {
        try {
          const response = await axios.get('http://localhost:8080/requirement/complianceCount', { headers });
          const data: Object[][] = response.data;
        setComplianceData(data);
        
        } catch (error) {
          console.error('Error al obtener la lista ', error);
        }
      };

      const handleRequirementClick = (id: string)=>{
        navigate(`/requisito/${id}`);
      };

      useEffect(() => {
        fetchRequirementsPerCategory();
        fetchRequirementsPerCompliance();
        fetchRequirementsPerState();
        fetchRequirementsPerType();
        fetchActionsInfo();
        
      }, []);

      const handleFetchRequirements = async () => {

            if(ShowActions == true){
              setShowActions(false);
            }
        
            loadRequirements();
            setShowRequirements(true);
      };

      const handleFetchActions = async () => {

        if(ShowRequirements == true){
          setShowRequirements(false);
        }
    
        loadActions();
        setShowActions(true);
  };
    
      const labelsCategory = categoryData.map(item => String(item[0]));
    const valuesCategory = categoryData.map(item => Number(item[1])); 
    
    const dataCategory = {
      labels: labelsCategory,
      values: valuesCategory
    };

    const labelsType = typeData.map(item => String(item[0])); 
    const valuesType = typeData.map(item => Number(item[1]));

    const dataType = {
      labels: labelsType,
      values: valuesType
    };

    const labelsState = stateData.map(item => String(item[0]));
    const valuesState = stateData.map(item => Number(item[1]));

    const dataState = {
      labels: labelsState,
      values: valuesState
    };

     const labelsCompliance = complianceData.map(item => String(item[0]));
    const valuesCompliance = complianceData.map(item => Number(item[1]));
 
    const dataCompliance = {
      labels: labelsCompliance,
      values: valuesCompliance
    };

    const labelsActions = actionsData.map(item => String(item[0]));
    const valuesActions = actionsData.map(item => Number(item[1])); 

    const dataActions = {
      labels: labelsActions,
      values: valuesActions
    };

    const handleClick = (event: MouseEvent) => {

      console.log('Clicked on the chart!');
    };

   
  

    
  return (
    
   <div className="statss-container">
    <div className="stats-header">
    <button className="stats-button" onClick={() =>  handleFetchRequirements()} >Todos los Requisitos</button>
    <button className="stats-button" onClick={() =>  handleFetchActions()}>Todos las Acciones</button>
    </div>
    <div className="stats-container-grid">
        <div className="stat-item">
            <h1 className="stat-item-title">Requisitos por categoria</h1>
            <DonutChart data={dataCategory} colors={["#87fa69","#699dfa","#ffd95c"]}/>
        </div>
        <div className="stat-item">
        <h1 className="stat-item-title">Requisitos por Tipo</h1>
            <DonutChart data={dataType} colors={["#698bfa","#699dfa","#69cefa"]} handleChartClick={handleClick}/>
        </div>
        <div className="stat-item">
        <h1 className="stat-item-title">Estado de evaluación</h1>
            <DonutChart data={dataState} colors={["#6e568b","#cabed8","#69cefa"]}/>
        </div>
        <div className="stat-item">
        <h1 className="stat-item-title">Estado de cumplimiento</h1>
            <DonutChart data={dataCompliance} colors={["#5cd4ff","#92ff5c","#ff5c5c","#f9ff5c"]}/>
        </div>
        <div className="stat-item">
        <h1 className="stat-item-title">Acciones relacionadas</h1>
            <DonutChart data={dataActions} colors={["#fa6969","#f9ff5c","#92ff5c"]}/>
        </div>
        
        
    </div>
    {ShowRequirements && (
    <table className="requisito-actions-tabla">
    <thead>
      <tr>
        <th className="requisito-actions-table-headitem" scope="col">
          Categoria
        </th>
        <th className="requisito-actions-table-headitem" scope="col">
          Grupo
        </th>
        <th className="requisito-actions-table-headitem" scope="col">
          Titulo
        </th>
        <th className="requisito-actions-table-headitem" scope="col">
          Tipo
        </th>
        <th className="requisito-actions-table-headitem" scope="col">
          Cumplimiento
        </th>
        <th className="requisito-actions-table-headitem" scope="col">
          Relevancia
        </th>
        <th className="requisito-actions-table-headitem" scope="col">
          Planta
        </th>
      </tr>
    </thead>
    <tbody>
      {requirements.map((requirement, index) => (
        <tr className="requisito-actions-table-row">
          <td className="requisito-actions-table-item">
            {requirement.category.category}
          </td>
          <td className="requisito-actions-table-item">
          {requirement.category.tipo === "MA" ? "Medio Ambiente" : 
              requirement.category.tipo === "SSO" ? "Seguridad y Salud Ocupacional" :
            requirement.category.tipo === "OTRO" ? "Otro" : "No tiene"}
          </td>
          <td className="requisito-actions-table-item-title" onClick={() =>  handleRequirementClick(`${requirement.requirementId.toString()}`)}>{requirement.title}</td>
         
          <td className="requisito-actions-table-item">{requirement.type}</td>
          <td className="requisito-actions-table-item">
            {requirement.compliance}
          </td>
          <td className="requisito-actions-table-item">{requirement.relevance}</td>
          <td className="requisito-actions-table-item">{requirement.plant.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
    )}

{ShowActions && ( 
  <table className="actions-tabla">
  <thead>
    <tr >
      <th className="action-table-headitem">Titulo</th>
      <th className="action-table-headitem">Fecha Limite</th>
      <th className="action-table-headitem">Responsable</th>
      <th className="action-table-headitem">Avance</th>
      <th className="action-table-headitem">Estado</th>
      <th className="action-table-headitem">Planta</th>

    </tr>
  </thead>
  <tbody>
    {loadedAction.map((action, index) => (
      <tr className="action-table-row" key={action.actionId}>
        <td className="action-table-item-title">{action.title}</td>
        <td className="action-table-item">{action.fechaLimite instanceof Date
          ? action.fechaLimite.toDateString()
          : new Date(action.fechaLimite).toDateString()}</td>
        <td className="action-table-item">{action.responsable}</td>

        <td className="action-table-item">{action.avance}</td>
        <td className="action-table-item">{action.estado}</td>
        <td className="action-table-item">{action.requirement && action.requirement.plant ? action.requirement.plant.name : null}</td>
      </tr>
    ))}
  </tbody>


</table>

 )} 
   </div>
  );
};
export default Stats;