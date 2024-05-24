import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Requisito.css"
import { useNavigate } from 'react-router-dom';
import ActionModal from "../../../Acciones/componentes/ActionModal/ActionModal";


interface CategoriasProps {
  idRequisito: string;
}





export const Requisito: React.FC<CategoriasProps> = ({ idRequisito }) => {
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
      };
  }

  interface requisitoObjeto {
    title: string;
    actualState: boolean;
    requirement: string;
    type: string;
    compliance: string;
    relevance: string;
    lastActionReviewer:string;
    lastReview:string;
    
  }

  const [loadedRequisito, setLoadedRequisito] = useState<requisitoObjeto | null>(null);
  const [selectedAction, setSelectedAction] = useState<accionObjeto | null>(null);
  const [loadedAction, setLoadedAction] = useState<accionObjeto[]>([]);

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let navigate = useNavigate();
  useEffect(() => {
    loadRequirement();
    loadActions();
  }, []);

  const loadRequirement = async () => {
    const result = await axios.get(`http://localhost:8080/requirement/${idRequisito}`, { headers });
    setLoadedRequisito(result.data);
  };

  const loadActions = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/action/requirement/${idRequisito}`, { headers });
      setLoadedAction(result.data);
    } catch (error) {
      console.error("Error al cargar las plantas:", error);
    }
  };

  

  const handleActionClick = (action: accionObjeto) => {
    setSelectedAction(action);
  };

  const closeActionModal = () => {
    setSelectedAction(null);
    loadActions();
  };


  return (
    <div className="requisito-container-div">
      {loadedRequisito ? ( 

        <div className="requisito-detalles">

          <div className="requisito-detalle-title-head">
            <span className="requisito-valor-title">{loadedRequisito.title}</span>
            <div>
            <button className="add-action-button" onClick={() => navigate(`/requisito/edit/${idRequisito}`)}>Editar Requisito</button>
            <button className="add-action-button" onClick={() => navigate(`/accion/${idRequisito}`)}>Añadir Accion</button>
            </div>
            
          </div>
          <div className="requisito-detalle-container-descripcion">
            <div className="requisito-detalle">

              <div className="requisito-detalle-title">
                <span className="requisito-label">Requisito:</span>
              </div>

              <div className="requisito-detalle-content">
                <span className="requisito-valor">{loadedRequisito.requirement}</span>
              </div>


            </div>

          </div>
          <div className="requisito-detalle-container-cumplimiento">
            <div className="requisito-detalle-cumplimiento">

              <div className={`requisito-valor-cumplimiento-${loadedRequisito.compliance}`}>
                <span className="requisito-valor">{loadedRequisito.compliance}</span>
              </div>

            </div>

          </div>
          <div className="requisito-detalle-container-comentarios">
            <div className="requisito-detalle">
              <div className="requisito-detalle-title">
                <span className="requisito-label">Comentarios:</span>
              </div>
              <div className="requisito-detalle-content">
              </div>
            </div>

          </div>



          <div className="requisito-detalle-container-relevancia">
            <div className="requisito-detalle-relevancia">
              <div className="requisito-detalle-content">
                <span className="requisito-label">Relevancia:</span>
                <span className="requisito-valor">{loadedRequisito.relevance}</span>
              </div>
              <div className="requisito-detalle-content">
                <span className="requisito-label">Revisor: {loadedRequisito.lastActionReviewer}</span>

              </div>
              <div className="requisito-detalle-content">
                <span className="requisito-label">Ultima revision: {loadedRequisito.lastReview}</span>

              </div>

            </div>
          </div>


          <div className="requisito-detalle-container-acciones">
            <div className="requisito-detalle-acciones">
              <div className="requisito-detalle-acciones">
                <span className="requisito-label">Acciones:</span>
                <div className="actions-container">
                  <table className="actions-tabla">
                    <thead>
                      <tr >
                        <th className="action-table-headitem">Titulo</th>
                        <th className="action-table-headitem">Descripción</th>
                        <th className="action-table-headitem">Fecha Limite</th>
                        <th className="action-table-headitem">Responsable</th>
                        <th className="action-table-headitem">Avance</th>
                        <th className="action-table-headitem">Estado</th>

                      </tr>
                    </thead>
                    <tbody>
                      {loadedAction.map((action, index) => (
                        <tr className="action-table-row" key={action.actionId}>
                          <td onClick={() => handleActionClick(action)} className="action-table-item-title">{action.title}</td>
                          <td className="action-table-item">{action.description}</td>
                          <td className="action-table-item">{action.fechaLimite instanceof Date
                            ? action.fechaLimite.toDateString()
                            : new Date(action.fechaLimite).toDateString()}</td>
                          <td className="action-table-item">{action.responsable}</td>

                          <td className="action-table-item">{action.avance}</td>
                          <td className="action-table-item">{action.estado}</td>

                        </tr>
                      ))}
                    </tbody>


                  </table>

                </div>
              </div>


            </div>


          </div>
          <div className="requisito-detalle-container-archivos">
            <div className="requisito-detalle-archivos">

              <div className="requisito-label-archivos">
                <span className="requisito-label">Archivos:</span>
              </div>

            </div>
          </div>



        </div>

      ) : (
        <p>Cargando requisito...</p>
      )}

      {selectedAction && (<>
         <div className="backgroundBlur" />
        <ActionModal action={selectedAction} onClose={closeActionModal} />
        </>
      )}
    </div>
  );
};