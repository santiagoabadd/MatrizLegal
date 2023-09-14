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
    categoryId:''
  });

  const [categorys, setCategorys] = useState([]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNormativaData({ ...normativaData, [name]: value });
  };

  const fetchCategorys = async () => {
    try {
      const responseCategorys = await axios.get('http://localhost:8080/category'); // Reemplaza la URL por la correcta
      setCategorys(responseCategorys.data); // Asigna la lista de plantas al estado
    } catch (error) {
      console.error('Error al obtener la lista de plantas', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(normativaData);
    await axios.post('http://localhost:8080/normativa', normativaData);
    navigate('/');
  };

  useEffect(() => {
    fetchCategorys();
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
          <label htmlFor="categoryId">Category</label>
          <select
            className="form-control"
            name="categoryId"
            value={normativaData.categoryId}
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
          Añadir Normativa
        </button>
      </form>
    </div>
  );
}