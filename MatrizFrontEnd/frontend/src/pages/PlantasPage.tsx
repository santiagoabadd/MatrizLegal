import React from "react";
import { SideBarMenu } from "../features/SideBarMenu/components/SideBarMenuContainer/SideBarMenu";
import { NavBar } from "../features/NavBar/components/NavBarContainer/NavBar";
import "./Plantas.css";
import { Plantas } from "../features/ListaPlantas/components/Plantas/Plantas";
export const PlantasPage: React.FC = () => {
  return (
    <div className="home-container">
      <NavBar />
      <SideBarMenu />
      <div className="lista-plantas-container">
        <Plantas/>
      </div>
    </div>
  );
};
