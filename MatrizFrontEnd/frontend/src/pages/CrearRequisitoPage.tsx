import React from "react";
import "./CrearRequisitoPage.css";
import { NavBar } from "../features/NavBar/components/NavBarContainer/NavBar";
import { SideBarMenu } from "../features/SideBarMenu/components/SideBarMenuContainer/SideBarMenu";
import { CrearRequisito } from "../features/CrearRequisito/components/CrearRequisitoContainer/CrearRequisito";

export const CrearRequisitoPage: React.FC = () => {
  return (
    <div className="crear-requisito-page">
      <NavBar />
      <SideBarMenu />
      <div className="crear-requisito-container">
        <CrearRequisito />
      </div>
    </div>
  );
};
