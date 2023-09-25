import React from "react";
import { SideBarMenu } from "../features/SideBarMenu/components/SideBarMenuContainer/SideBarMenu";
import { NavBar } from "../features/NavBar/components/NavBarContainer/NavBar";
import "./Requisitos.css";
import { Requisitos } from "../features/ListaRequisitos/components/Requisitos/Requisitos";
export const RequisitosPage: React.FC = () => {
  return (
    <div className="home-container">
      <NavBar />
      <SideBarMenu />
      <div className="lista-requisitos-container">
        <Requisitos />
      </div>
    </div>
  );
};
