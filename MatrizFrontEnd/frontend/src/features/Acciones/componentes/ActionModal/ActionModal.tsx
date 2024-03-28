
import "./ActionModal.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';

interface ActionModalProps {
    action: ActionObjet; // Define the interface for the action object here
    onClose: () => void;
}

interface ActionObjet {
    actionId: number;
    fechaLimite: Date;
    title: String;
    description: string;
    avance: number;
    responsable: string;
    estado: string;
    requirement: {
        requirementId: number;
    }
}

interface requisitoObjeto {
    title: string;
    actualState: boolean;
    requirement: string;
    type: string;
    compliance: string;
    relevance: string;
}



const ActionModal: React.FC<ActionModalProps> = ({ action, onClose }) => {

    const [loadedRequisito, setLoadedRequisito] = useState<requisitoObjeto | null>(null);
    const [selectedAction, setSelectedAction] = useState<ActionObjet | null>(null);

    const [avance, setAvance] = useState<number>(action.avance);

    const handleAvanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvance(parseInt(e.target.value));
    };


    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    let navigate = useNavigate();
    useEffect(() => {
        loadRequirement();

    }, []);

    const loadRequirement = async () => {
        const result = await axios.get(`http://localhost:8080/requirement/${action.requirement}`, { headers });
        setLoadedRequisito(result.data);
    };

    const handleActionClick = (action: ActionObjet) => {
        setSelectedAction(action);
    };

    const deleteAction = async (id: number) => {
        try {
          await axios.delete(`http://localhost:8080/action/${id}`);
          
        } catch (error) {
          console.error("Error al eliminar la accion", error);
        }
      };
    

    const closeActionModal = () => {
        setSelectedAction(null);
    };

    const handleGuardarAccion = async () => {
        try {
            if (selectedAction !== null) {
            selectedAction.avance=avance;
            }
          console.error(selectedAction);
          await axios.put(`http://localhost:8080/action/${selectedAction?.actionId}`, selectedAction,{headers });

          onClose();
        } catch (error) {
          
          console.error('Error saving action:', error);
        }
      };


    return (
        <div className="modal-overlay">
            <div className="modal-content-vencimiento">
                <div className='modal-header'>
                    <h2>{action.title}</h2>
                    <button className="modal-button" onClick={onClose}>Close</button>
                </div>

                <div className='modal-details'>
                    <p>Fecha Limite: {action.fechaLimite instanceof Date
                        ? action.fechaLimite.toDateString()
                        : new Date(action.fechaLimite).toDateString()}</p>
                    {/* Display other action details here */}
                    <p>Descripcion: {action.description}</p>
                    <p>Estado: {action.estado}</p>
                    <p>Avance: {action.avance}%</p>
                    <p>Responsable: {action.responsable}</p>
                    <div className="modal-requirement">
                        <p>Requisito asociado: {loadedRequisito?.title} </p>
                        <Link to={`/requisito/${action.requirement}`} className="modal-requirement-link">
                            <LaunchIcon className="modal-requirement-icon" />
                        </Link>
                    </div>
                    {selectedAction && (
                        <div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={avance}
                            onChange={handleAvanceChange}
                        />
                        <p>Nuevo Avance: {avance}%</p>
                        <button onClick={handleGuardarAccion}>Guardar Accion</button>
                         <button onClick={onClose}>Cerrar</button>
                         </div>
                    )}
                    <div className="modal-buttons">
                        <button className="modal-button-edit-avance" onClick={() => handleActionClick(action)}>Modificar Avance</button>
                        <button className="modal-button-delete" onClick={() =>deleteAction(action.actionId)}>Anular Accion</button>
                        <button className="modal-button" onClick={() =>navigate(`/accion/edit/${action.actionId}`)}>Editar Accion</button>
                    </div>



                </div>



            </div>
        </div>
    );
};

export default ActionModal;