import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddRequirementForm() {
  let navigate = useNavigate();

  const [requirementData, setRequirementData] = useState({
    actualState: '',
    compliance: '',
    relevance: '',
    requirement: '',
    title: '',
    type: '',
    plantId: '',
    categoryId:'',
    customerId:'708'
  });

  const [plants, setPlants] = useState([]);
  const [categorys, setCategorys] = useState([]); // Estado para almacenar la lista de plantas

  // Función para cargar la lista de plantas desde el backend
  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/plant'); // Reemplaza la URL por la correcta
      setPlants(response.data); // Asigna la lista de plantas al estado
    } catch (error) {
      console.error('Error al obtener la lista de plantas', error);
    }
  };

  const fetchCategorys = async () => {
    try {
      const caregoryResponse = await axios.get('http://localhost:8080/category'); // Reemplaza la URL por la correcta
      setCategorys(caregoryResponse.data); // Asigna la lista de plantas al estado
    } catch (error) {
      console.error('Error al obtener la lista de categorias', error);
    }
  };

  useEffect(() => {
    fetchPlants();
    fetchCategorys();
  }, []);


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRequirementData({ ...requirementData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    
    await axios.post('http://localhost:8080/requirement', requirementData);
    navigate('/');
  };

  return (
    <div>
      <h2>Añadir Requerimiento</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="actualState">Estado Actual</label>
          <input
            type="text"
            className="form-control"
            name="actualState"
            placeholder="Estado Actual"
            value={requirementData.actualState}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Titulo"
            value={requirementData.title}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <input
            type="text"
            className="form-control"
            name="type"
            placeholder="Tipo de requisito"
            value={requirementData.type}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="compliance">Cumplimiento</label>
          <input
            type="text"
            className="form-control"
            name="compliance"
            placeholder="Cumplimiento"
            value={requirementData.compliance}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="relevance">Relevancia</label>
          <input
            type="text"
            className="form-control"
            name="relevance"
            placeholder="Relevancia"
            value={requirementData.relevance}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirement">Requerimiento</label>
          <input
            type="text"
            className="form-control"
            name="requirement"
            rows={3}
            placeholder="Descripción del Requerimiento"
            value={requirementData.requirement}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="plantId">Planta</label>
          <select
            className="form-control"
            name="plantId"
            value={requirementData.plantId}
            onChange={(e) => onInputChange(e)}
          >
            <option value="">Seleccionar planta</option>
            {plants.map((plant) => (
              <option key={plant.plantId} value={plant.plantId}>
                {plant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Category</label>
          <select
            className="form-control"
            name="categoryId"
            value={requirementData.categoryId}
            onChange={(e) => onInputChange(e)}
          >
            <option value="">Seleccionar categoria</option>
            {categorys.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Añadir Requerimiento
        </button>
      </form>
    </div>
  );
}