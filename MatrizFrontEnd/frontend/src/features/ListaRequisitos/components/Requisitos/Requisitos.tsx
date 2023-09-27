import axios from "axios";
import React, { useState, useEffect } from "react";

import "./Requisitos.css";

export const Requisitos: React.FC = () => {
  interface requisitoObjeto {
    title: string;
    actualState: boolean;
    requirement: string;
    type: string;
    compliance: string;
    relevance: string;
  }

  const [requirements, setRequirements] = useState<requisitoObjeto[]>([]);

  const token = localStorage.getItem('jwtToken');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    loadRequirements();
  }, []);

  const loadRequirements = async () => {
    const result = await axios.get("http://localhost:8080/requirement",{headers});
    setRequirements(result.data);
  };
  return (
    <div className="requisitos-container">
      <div className="requisitos-header-group">
        <h4>Listado de requisitos</h4>
      </div>
      <table className="requisitos-tabla">
        <thead>
          <tr>
            <th className="requisitos-table-headitem" scope="col">
              Titulo
            </th>
            <th className="requisitos-table-headitem" scope="col">
              EstadoActual
            </th>
            <th className="requisitos-table-headitem" scope="col">
              Requisito
            </th>
            <th className="requisitos-table-headitem" scope="col">
              Tipo
            </th>
            <th className="requisitos-table-headitem" scope="col">
              Cumplimiento
            </th>
            <th className="requisitos-table-headitem" scope="col">
              Relevancia
            </th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((requirement, index) => (
            <tr className="requisitos-table-row">
              <td className="requisitos-table-item">{requirement.title}</td>
              <td className="requisitos-table-item">
                {requirement.actualState}
              </td>
              <td className="requisitos-table-item">
                {requirement.requirement}
              </td>
              <td className="requisitos-table-item">{requirement.type}</td>
              <td className="requisitos-table-item">
                {requirement.compliance}
              </td>
              <td className="requisitos-table-item">{requirement.relevance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
