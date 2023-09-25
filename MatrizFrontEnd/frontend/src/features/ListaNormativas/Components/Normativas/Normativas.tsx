import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Normativas.css";

export const Normativas: React.FC = () => {
  interface normativaObjeto {
    norma: string;
    title: string;
    authority: string;
    organism: string;
    jurisdiction: string;
    current: boolean;
  }

  const [normativas, setNormativas] = useState<normativaObjeto[]>([]);

  //const { id } = useParams();

  useEffect(() => {
    loadNormativas();
  }, []);

  const loadNormativas = async () => {
    const result = await axios.get("http://localhost:8080/normativa");
    setNormativas(result.data);
  };
  return (
    <div className="normativas-container">
      <div className="normativas-header-group">
        <h4>Listado de normativas</h4>
      </div>
      <table className="normativas-tabla">
        <thead>
          <tr>
            <th className="normativa-table-headitem" scope="col">
              Norma
            </th>
            <th className="normativa-table-headitem" scope="col">
              Titulo
            </th>
            <th className="normativa-table-headitem" scope="col">
              Autoridad
            </th>
            <th className="normativa-table-headitem" scope="col">
              Organismo
            </th>
            <th className="normativa-table-headitem" scope="col">
              Jurisdicción
            </th>
            <th className="normativa-table-headitem" scope="col">
              Actual
            </th>
            <th className="normativa-table-headitem" scope="col">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {normativas.map((normativa, index) => (
            <tr className="normativa-table-row" key={index}>
              <td className="normativa-table-item">{normativa.norma}</td>
              <td className="normativa-table-item">{normativa.title}</td>
              <td className="normativa-table-item">{normativa.authority}</td>
              <td className="normativa-table-item">{normativa.organism}</td>
              <td className="normativa-table-item">{normativa.jurisdiction}</td>
              <td className="normativa-table-item">
                {normativa.current ? "Sí" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
