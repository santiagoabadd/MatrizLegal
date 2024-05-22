import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/Slices/UserSlice";
import { AppDispatch, RootState } from "../redux/Store";
import "./EditRequisito.css";
import { NavBar } from "../features/NavBar/components/NavBarContainer/NavBar";
import { SideBarMenu } from "../features/SideBarMenu/components/SideBarMenuContainer/SideBarMenu";
import { CrearRequisito } from "../features/CrearRequisito/components/CrearRequisitoContainer/CrearRequisito";
import { EditarRequisito } from "../features/EditarRequisito/components/EditarRequisitoContainer/EditarRequisito";
import { useParams } from 'react-router-dom';
import axios from "axios";

export const EditarRequisitoPage: React.FC = () => {

    const { id } = useParams<{ id?: string }>();
  const requirementId = id ? id : '';

  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const checkToken = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/checkToken",{headers});
     
    } catch (error) {
      navigate("/")
      console.error("Error al verificar el token", error);
    }
  };

  useEffect(() => {
    
    
    if (jwt === "" && state.token !== "") {
      console.log("1");
      
      console.log(state.token);
      setJwt(state.token);
    } else if (jwt !== "" && state.token === "") {
      console.log("2");
      checkToken();
        
      
      
    } else if (jwt !== "" && state.token !== "") {
      console.log("3");
      if (jwt !== state.token) {
        console.log("4");
        setJwt(state.token);
      }
    } else {
     
      navigate("/");
    }
  }, []);
  
  return (
    <div className="edit-requisito-page">
      <NavBar />
      <SideBarMenu />
      <div className="edit-requisito-container">
        <EditarRequisito idRequirement={requirementId} />
      </div>
    </div>
  );
};
