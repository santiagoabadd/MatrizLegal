
import "./Vencimientos.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import ActionModal from "../../../Acciones/componentes/ActionModal/ActionModal";

interface Dia {
  numero: number;
  fecha: Date;
}

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



const Vencimientos: React.FC = () => {

    const [actions, setActions] = useState<ActionObjet[]>([]);
    const [selectedAction, setSelectedAction] = useState<ActionObjet | null>(null);

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    loadActions();
  }, []);

  const loadActions= async () => {
    const result = await axios.get("http://localhost:8080/action",{headers});
    setActions(result.data);
  };

  const handleActionClick = (action: ActionObjet) => {
    setSelectedAction(action);
  };

  const closeActionModal = () => {
    setSelectedAction(null);
    loadActions();
  };

  const [mesActual, setMesActual] = useState(new Date());

  const obtenerDiasDelMes = (): Dia[] => {
    const primerDiaDelMes = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);
    const ultimoDiaDelMes = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0);
    const diasDelMes: Dia[] = [];

    for (let i = 1; i <= ultimoDiaDelMes.getDate(); i++) {
      const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), i);
      diasDelMes.push({ numero: i, fecha });
    }

    return diasDelMes;
  };

  const cambiarMes = (incremento: number): void => {
    setMesActual((prevMes) => new Date(prevMes.getFullYear(), prevMes.getMonth() + incremento, 1));
  };

  const diasDelMes = obtenerDiasDelMes();

  const obtenerNombresDiasSemana = (): string[] => {
    const nombresDias = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const primerDia = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1).getDay();
    return nombresDias.slice(primerDia).concat(nombresDias.slice(0, primerDia));
  };

  const nombresDiasSemana = obtenerNombresDiasSemana();


  return (
    
    <div className="calendario-container">
      <div className="header">
        <button className='button-header' onClick={() => cambiarMes(-1)}>&lt;</button>
        <h2>{mesActual.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button className='button-header' onClick={() => cambiarMes(1)}>&gt;</button>
      </div>
      <div className="dias-semana">
      {nombresDiasSemana.map((dia) => (
          <div key={dia} >
            {dia}
          </div>
        ))}
      </div>
      <div className="tabla-dias">
        {diasDelMes.map((dia) => (
          <div key={dia.fecha.toISOString()} className="celda-dia">
            {dia.numero}
          
          <div className="acciones">
          {actions.map((action) => {
        // Comparar si la fecha de la acción coincide con la fecha del día en el calendario
        const actionDate = new Date(action.fechaLimite);
        const calendarDate = new Date(dia.fecha);
        
        if (actionDate.getFullYear() === calendarDate.getFullYear() &&
            actionDate.getMonth() === calendarDate.getMonth() &&
            actionDate.getDate() === calendarDate.getDate()) {console.log(action.requirement);
          return <div onClick={() => handleActionClick(action)} className="action-cell" key={action.actionId}>{action.title}</div>;
        }
        return null;
      })}
        </div>
        </div>
        ))}
      </div>
      {selectedAction && (<>
         <div className="backgroundBlur" />
        <ActionModal action={selectedAction} onClose={closeActionModal} />
        </>
      )}
    </div>
  );
};
export default Vencimientos;