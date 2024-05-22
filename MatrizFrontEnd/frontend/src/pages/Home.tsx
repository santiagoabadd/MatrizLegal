import React, { useEffect } from "react";
import { SideBarMenu } from "../features/SideBarMenu/components/SideBarMenuContainer/SideBarMenu";
import { NavBar } from "../features/NavBar/components/NavBarContainer/NavBar";
import { Normativas } from "../features/ListaNormativas/Components/Normativas/Normativas";
import "./Home.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/Slices/UserSlice";
import { AppDispatch, RootState } from "../redux/Store";
import { CategoriasMenu } from "../features/Categorias/components/CategoriasContainer/CategoriasMenu";
import { VencimientosSidePanel } from "../features/Vencimientos/components/VencimientosSidePanel/VencimientosSidePanel";
import axios from 'axios';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");

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
    <div className="home-container">
      <NavBar />
      <SideBarMenu />
      <div className="categorias-container">
        <CategoriasMenu/>
      </div>
      <VencimientosSidePanel/>
    </div>
  );
};
