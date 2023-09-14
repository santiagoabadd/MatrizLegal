import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

export default function Home() {
    const [requirements,setRequirements]=useState([]);

    const { id } = useParams();

    useEffect( ()=> {
        loadRequirements();
    },[]);

    const loadRequirements=async ()=>{
        const result=await axios.get("http://localhost:8080/requirement");
        setRequirements(result.data);
    }

    const deleteRequirement = async (id) => {
      await axios.delete(`http://localhost:8080/requirement/${id}`);
      loadRequirements();
    };


  return (

     <div className="container">
        <div className="py-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">EstadoActual</th>
                  <th scope="col">Requisito</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Cumplimiento</th>
                  <th scope="col">Relevancia</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  requirements.map((requirement,index)=>(
                    <tr>
                      <th scope="row" key={index}>{index+1}</th>
                      <td>{requirement.title}</td>
                      <td>{requirement.actualState}</td>
                      <td>{requirement.requirement}</td>
                      <td>{requirement.type}</td>
                      <td>{requirement.compliance}</td>
                      <td>{requirement.relevance}</td>
                      <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editrequirement/${requirement.requirementId}`}
                  >
                    Edit
                  </Link>
                  <Link className="btn btn-success mx-2" to={`/addaction/${requirement.requirementId}`}>
                   Add Action
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteRequirement(requirement.requirementId)}
                  >
                    Delete
                  </button>
                </td>
                    </tr>
                  ))
                }
               
                
              </tbody>
            </table>
        </div>
     </div>

  );
}

