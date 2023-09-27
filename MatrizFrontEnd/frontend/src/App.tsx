import React from "react";
import "./assets/global.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Theme } from "./utils/GlobalInterfaces";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RequisitosPage } from "./pages/RequisitosPage";
import { Landing } from "./pages/Landing";
import { CrearRequisitoPage } from "./pages/CrearRequisitoPage";

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
        <Route path="/home" element={<Home />} />
        <Route path="/requisitos" element={<RequisitosPage />} />
        <Route path="/crear-requisito" element={<CrearRequisitoPage />} />
      </Routes>
    </ThemeProvider>
  );
};
