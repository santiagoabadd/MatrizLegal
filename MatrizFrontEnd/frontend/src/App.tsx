import React from "react";
import "./assets/global.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Theme } from "./utils/GlobalInterfaces";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RequisitosPage } from "./pages/RequisitosPage";
import { Landing } from "./pages/Landing";
import { Plantas } from "./features/ListaPlantas/components/Plantas/Plantas";
import { PlantasPage } from "./pages/PlantasPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { CrearRequisitoPage } from "./pages/CrearRequisitoPage";
import { RequisitoPage } from "./pages/RequisitoPage";
import { NormativasPage } from "./pages/NormativasPage";
import { Categorias } from "./features/Categorias/components/CategoriasContainer/Categorias";
import { CrearAccionPage } from "./pages/CrearAccionPage";
import {VencimientosPage} from "./pages/VencimientosPage";
import { EditActionPage } from "./pages/EditActionPage";
import { EditarRequisito } from "./features/EditarRequisito/components/EditarRequisitoContainer/EditarRequisito";
import { EditarRequisitoPage } from "./pages/EditRequisitoPage";
import { StatsPage } from "./pages/StatsPage";

const theme: Theme = {
  colors: {
    blue: "#1DA1F2",
    black: "#14171a",
    darkGray: "#657786",
    gray: "#AAB8C2",
    lightGray: "#E1E8ED",
    white: "#f5f8fa",
    error: "red",
  },
};

const GlobalStyle = createGlobalStyle`
*{

  font-weight:500;
  margin:0;
}
`;

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/normativas" element={<NormativasPage />} />
        <Route path="/requisitos" element={<RequisitosPage />} />
        <Route path="/plantas" element={<PlantasPage/>} />
        <Route path="/usuarios" element={<UsuariosPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/vencimientos" element={<VencimientosPage/>} />
        <Route path="/accion/:id" element={<CrearAccionPage/>} />
        <Route path="/crear-requisito" element={<CrearRequisitoPage/>} />
        <Route path="/requisito/:id" element={<RequisitoPage/>} />
        <Route path="/accion/edit/:id" element={<EditActionPage/>} />
        <Route path="/requisito/edit/:id" element={<EditarRequisitoPage/>} />
        <Route path="/stats" element={<StatsPage/>} />
      </Routes>
    </ThemeProvider>
  );
};
