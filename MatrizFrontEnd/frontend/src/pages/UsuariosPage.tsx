import React from "react";
import { SideBarMenu } from "../features/SideBarMenu/components/SideBarMenuContainer/SideBarMenu";
import { NavBar } from "../features/NavBar/components/NavBarContainer/NavBar";
import "./Usuarios.css";
import { Usuarios } from "../features/ListaUsuarios/components/Usuarios/Usuarios";
export const UsuariosPage: React.FC = () => {
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
