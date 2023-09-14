import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';


export default function EditRequirementForm() {

  let navigate=useNavigate();

  const { id } = useParams();

  const [requirementData, setRequirement] = useState({
      actualState:"",
      compliance:"",
      relevance:"",
      requirement:"",
      title:"",
      type:""



  });
 
  const {actualState,compliance,relevance,requirement,title,type}=requirementData;

  const onInputChange = (e) => {
      setRequirement({...requirementData,[e.target.name]:e.target.value});
  };

  useEffect(() => {
    loadRequirement();
  },[]);

  const onSubmit= async (e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8080/requirement/${id}`,requirementData)
    navigate("/")
  };

  const loadRequirement = async () => {
    const result = await axios.get(`http://localhost:8080/requirement/${id}`);
    setRequirement(result.data);
  };

  return (
    <div>
  <h2>Añadir Requerimiento</h2>
  <form onSubmit={(e)=> onSubmit(e)}>
    <div className="form-group">
      <label htmlFor="actualState">Estado Actual</label>
      <input
        type={"text"}
        className="form-control"
        name="actualState"
        placeholder="Estado Actual"
        value={actualState}
        onChange={(e) => onInputChange(e)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="title">Titulo</label>
      <input
        type={"text"}
        className="form-control"
        name="title"
        placeholder="Titulo"
        value={title}
        onChange={(e) => onInputChange(e)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="type">Tipo</label>
      <input
        type={"text"}
        className="form-control"
        name="type"
        placeholder="Tipo de requisito"
        value={type}
        onChange={(e) => onInputChange(e)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="compliance">Cumplimiento</label>
      <input
        type={"text"}
        className="form-control"
        name="compliance"
        placeholder="Cumplimiento"
        value={compliance}
        onChange={(e) => onInputChange(e)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="relevance">Relevancia</label>
      <input
        type={"text"}
        className="form-control"
        name="relevance"
        placeholder="Relevancia"
        value={relevance}
        onChange={(e) => onInputChange(e)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="requirement">Requerimiento</label>
      <input
        type={"text"}
        className="form-control"
        name="requirement"
        rows={3}
        placeholder="Descripción del Requerimiento"
        value={requirement}
        onChange={(e) => onInputChange(e)}
      />
    </div>

    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>
</div>
  )
}
