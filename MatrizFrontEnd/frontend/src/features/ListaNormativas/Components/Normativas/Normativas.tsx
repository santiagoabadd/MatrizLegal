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
  const [filtroNorma, setFiltroNorma] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroOrganismo, setFiltroOrganismo] = useState('');
  const [filtroJurisdiccion, setFiltroJurisdiccion] = useState('');
  const [filtroAuthority, setfiltroAuthority] = useState('');
  


  useEffect(() => {
    loadNormativas();
  }, [filtroNorma, filtroTitulo, filtroCategoria, filtroOrganismo, filtroJurisdiccion,filtroAuthority]);

  
  const token = localStorage.getItem('token');


  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const loadNormativas = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/normativas`,
        {
          params: {
            partialNorma: filtroNorma,
            partialTitle: filtroTitulo,
            partialCategoria: filtroCategoria,
            partialOrganismo: filtroOrganismo,
            partialJurisdiccion: filtroJurisdiccion,
            partialAuthority: filtroAuthority
          },
          headers,
        }
      );
      setNormativas(result.data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    switch (name) {
      case 'filtroNorma':
        setFiltroNorma(value);
        break;
      case 'filtroTitulo':
        setFiltroTitulo(value);
        break;
      case 'filtroCategoria':
        setFiltroCategoria(value);
        break;
      case 'filtroAuthority':
          setfiltroAuthority(value);  
        break;
      case 'filtroOrganismo':
        setFiltroOrganismo(value);
        break;
      case 'filtroJurisdiccion':
        setFiltroJurisdiccion(value);
        break;
      default:
        break;
    }
  };
  
  
  
  
  
  
  
  return (
    <div className="normativas-container">
      <div className="normativas-header-group">
        <h4>Listado de normativas</h4>
      </div>
      <div className="normativas-filtro-container">
        <input className="normativas-filtro-input"
          type="text"
          placeholder="Filtrar por norma"
          name="filtroNorma"
          value={filtroNorma}
          onChange={handleFilterChange}
        />
        <input className="normativas-filtro-input"
          type="text"
          placeholder="Filtrar por título"
          name="filtroTitulo"
          value={filtroTitulo}
          onChange={handleFilterChange}
        />
        <input className="normativas-filtro-input"
          type="text"
          placeholder="Filtrar por categoría"
          name="filtroCategoria"
          value={filtroCategoria}
          onChange={handleFilterChange}
        />
        <input className="normativas-filtro-input"
          type="text"
          placeholder="Filtrar por Autoridad"
          name="filtroAuthority"
          value={filtroAuthority}
          onChange={handleFilterChange}
        />
        <input className="normativas-filtro-input"
          type="text"
          placeholder="Filtrar por organismo"
          name="filtroOrganismo"
          value={filtroOrganismo}
          onChange={handleFilterChange}
        />
        <input className="normativas-filtro-input"
          type="text"
          placeholder="Filtrar por jurisdicción"
          name="filtroJurisdiccion"
          value={filtroJurisdiccion}
          onChange={handleFilterChange}
        />
        
      </div>
      
      <table className="normativas-tabla">
        <thead>
          <tr>
            <th className="normativa-table-headitem-norma" scope="col">
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
           
          </tr>
        </thead>
        <tbody>
          {normativas.map((normativa, index) => (
            <tr className="normativa-table-row" key={index}>
              <td className="normativa-table-item-norma">{normativa.norma}</td>
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
