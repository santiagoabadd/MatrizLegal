import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/Slices/UserSlice";
import { AppDispatch, RootState } from "../redux/Store";
import { SideBarMenu } from "../features/SideBarMenu/components/SideBarMenuContainer/SideBarMenu";
import { NavBar } from "../features/NavBar/components/NavBarContainer/NavBar";
import "./Usuarios.css";
import { Usuarios } from "../features/ListaUsuarios/components/Usuarios/Usuarios";
import axios from "axios";
export const UsuariosPage: React.FC = () => {

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
      // Ambos tokens existen, aquí podría ser útil validarlos o compararlos para asegurar consistencia.
      if (jwt !== state.token) {
        console.log("4");
        setJwt(state.token);
        // Los tokens son diferentes, manejar esto de acuerdo a la lógica de tu aplicación.
      }
    } else {
     
      navigate("/");
    }
  }, []);
  
  return (
    <div className="home-container">
      <NavBar />
      <SideBarMenu />
      <div className="lista-usuarios-container">
        <Usuarios/>
      </div>
    </div>
  );
};
