import React,{useState,useEffect} from 'react'
import axios from 'axios';

export default function Home() {
    const [requirements,setRequirements]=useState([]);

    useEffect( ()=> {
        loadRequirements();
    },[]);

    const loadRequirements=async ()=>{
        const result=await axios.get("http://localhost:8080/requirement");
        setRequirements(result.data);
    }



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
                    </tr>
                  ))
                }
               
                
              </tbody>
            </table>
        </div>
     </div>

  );
}

