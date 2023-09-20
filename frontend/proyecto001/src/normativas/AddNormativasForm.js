import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddNormativaForm() {
  let navigate = useNavigate();

  const [normativaData, setNormativaData] = useState({
    norma: '',
    title: '',
    authority: '',
    organism: '',
    jurisdiction: '',
    current: false,
    categoryIds: [] ,
    rubroIds: []
  });

  const token = localStorage.getItem('jwtToken');

      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };

  const [categorys, setCategorys] = useState([]);

  const [rubros, setRubros] = useState([]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'categoryIds') {
      // Si el campo es categoryIds, asegúrate de manejar los valores como números (si es necesario)
      const selectedCategoryIds = normativaData.categoryIds.slice(); // Clona el arreglo existente
      if (e.target.checked) {
        selectedCategoryIds.push(Number(value)); // Agrega el nuevo valor como número
      } else {
        const index = selectedCategoryIds.indexOf(Number(value));
        if (index !== -1) {
          selectedCategoryIds.splice(index, 1); // Elimina el valor si está deseleccionado
        }
      }
    
      setNormativaData({ ...normativaData, categoryIds: selectedCategoryIds });
    } else if (name === 'rubroIds') { // Aquí cambiamos a 'rubroIds'
      const selectedRubroIds = normativaData.rubroIds.slice(); // Clona el arreglo existente
      if (e.target.checked) {
        selectedRubroIds.push(Number(value)); // Agrega el nuevo valor como número
      } else {
        const index = selectedRubroIds.indexOf(Number(value));
        if (index !== -1) {
          selectedRubroIds.splice(index, 1); // Elimina el valor si está deseleccionado
        }
      }
    
      setNormativaData({ ...normativaData, rubroIds: selectedRubroIds });
    } else {
      // Para otros campos, simplemente asigna el valor normalmente
      setNormativaData({ ...normativaData, [name]: value });
    }
  };

  const fetchCategorys = async () => {
    try {
      const responseCategorys = await axios.get('http://localhost:8080/category',{headers}); // Reemplaza la URL por la correcta
      setCategorys(responseCategorys.data); // Asigna la lista de plantas al estado
    } catch (error) {
      console.error('Error al obtener la lista de plantas', error);
    }
  };

  const fetchRubros = async () => {
    try {
      const responseRubro = await axios.get('http://localhost:8080/rubro',{headers}); // Reemplaza la URL por la correcta
      setRubros(responseRubro.data); // Asigna la lista de plantas al estado
    } catch (error) {
      console.error('Error al obtener la lista de plantas', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(normativaData);
    await axios.post('http://localhost:8080/normativa', normativaData,{headers});
    await axios.post('http://localhost:8080/asignarNormativaARubros', normativaData,{headers});
    navigate('/');
  };

  useEffect(() => {
    fetchCategorys();
    fetchRubros();
  }, []);

  return (
    <div>
      <h2>Añadir Normativa</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="norma">Norma</label>
          <input
            type="text"
            className="form-control"
            name="norma"
            placeholder="Precio Base"
            value={normativaData.norma}
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
            value={normativaData.title}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="authority">Autoridad</label>
          <input
            type="text"
            className="form-control"
            name="authority"
            placeholder="Autoridad"
            value={normativaData.authority}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Categoría"
            value={normativaData.category}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="organism">Organismo</label>
          <input
            type="text"
            className="form-control"
            name="organism"
            placeholder="Organismo"
            value={normativaData.organism}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jurisdiction">Jurisdicción</label>
          <input
            type="text"
            className="form-control"
            name="jurisdiction"
            placeholder="Jurisdicción"
            value={normativaData.jurisdiction}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="current">Actual</label>
          <input
            type="checkbox"
            className="form-check-input"
            name="current"
            checked={normativaData.current}
            onChange={(e) =>
              setNormativaData({ ...normativaData, current: e.target.checked })
            }
          />
        </div>

        <div className="form-group">
  <label htmlFor="categoryIds">Categorías</label>
  <div className="form-check">
    {categorys.map((category) => (
      <div key={category.categoryId} className="form-check form-check-inline">
        <input
          type="checkbox"
          className="form-check-input"
          name="categoryIds"
          value={category.categoryId}
          checked={normativaData.categoryIds.includes(category.categoryId)}
          onChange={(e) => onInputChange(e)}
        />
        <label className="form-check-label">{category.category}</label>
      </div>
    ))}
  </div>
</div>

<div className="form-group">
  <label htmlFor="rubroIds">Rurbos</label>
  <div className="form-check">
    {rubros.map((rubro) => (
      <div key={rubro.rubroId} className="form-check form-check-inline">
        <input
          type="checkbox"
          className="form-check-input"
          name="rubroIds"
          value={rubro.rubroId}
          checked={normativaData.rubroIds.includes(rubro.rubroId)}
          onChange={(e) => onInputChange(e)}
        />
        <label className="form-check-label">{rubro.rubro}</label>
      </div>
    ))}
  </div>
</div>

        <button type="submit" className="btn btn-primary">
          Añadir Normativa
        </button>
      </form>
    </div>
  );
}