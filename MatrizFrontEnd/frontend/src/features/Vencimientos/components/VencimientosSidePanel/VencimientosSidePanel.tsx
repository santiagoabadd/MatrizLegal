import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VencimientosSidePanel.css"
import { useNavigate } from 'react-router-dom';
import ActionModal from "../../../Acciones/componentes/ActionModal/ActionModal";
import { Link } from "react-router-dom";

interface ActionObjet{
  actionId: number;
  fechaLimite: Date;
  title: String;
  description: string;
  avance: number;
  responsable: string;
  estado: string;
  requirement: {
    requirementId: number;
    };
  
}




export const VencimientosSidePanel: React.FC = () => {
 
  const [actions, setActions] = useState<ActionObjet[]>([]);
  const [selectedAction, setSelectedAction] = useState<ActionObjet | null>(null);
  const [headerText, setHeaderText] = useState<string>("Próximos vencimientos");

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let navigate = useNavigate();
  const handleActionClick = (action: ActionObjet) => {
    setSelectedAction(action);
  };
  useEffect(() => {
    
    const loadDefaultActions = async () => {
      await loadActions('close'); 
    };

    loadDefaultActions(); 

  }, []);

  const handleVencidosClick = () => {
    loadActions('expired');
  };

  const closeActionModal = () => {
    setSelectedAction(null);
   
  };

  const handleCloseClick = () => {
    loadActions('close');
  };

  const desarmarFecha = (fecha: Date) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.toLocaleString('es', { month: 'long' });
    const año = fechaObj.getFullYear();

    return { dia, mes, año };
  };

  const loadActions= async (endpoint: string) => {
    const result = await axios.get(`http://localhost:8080/action/${endpoint}`,{headers});
    setActions(result.data)
    if (endpoint === 'expired') {
      setHeaderText('Vencidos');
    } else {
      setHeaderText('Próximos vencimientos');
    };
  };

  return (
    <div className="sidepanel-container-div">
        <div className="sidepanel-headers">
            <div className="sidepanel-buttons">
            <button className="sidepanel-button-1"  onClick={handleVencidosClick}>Vencidos</button>
            <button className="sidepanel-button-2" onClick={handleCloseClick}>Por Vencer</button>
            </div>
            <div className="sidepanel-header">
            <h2>{headerText}</h2>
            </div>
        </div>
        
        <div className="sidepanel-vencimientos-grid">
        {actions.map((action, index) => (
          <div key={index} onClick={() => handleActionClick(action)}  className="vencimiento-item">
            <div className="vencimiento-item-dia">
              {desarmarFecha(action.fechaLimite).dia}
            </div>
            <div className="vencimiento-item-mes">
              {desarmarFecha(action.fechaLimite).mes}
            </div>
            <div className="vencimiento-item-year">
              {desarmarFecha(action.fechaLimite).año}
            </div>
          </div>
        ))}
      </div>
        <div className="sidepanel-buttons-bot">
            
            <Link to="/vencimientos" className="side-bar-button-container">
            <button className="sidepanel-button-3">Todos Los Vencimientos</button>
          </Link>
        </div>
        {selectedAction && (<>
         <div className="backgroundBlur" />
         <div className="sidepanel-action">
         <ActionModal  action={selectedAction} onClose={closeActionModal} />
         </div>
        
        </>
      )}
    </div>
  );
};