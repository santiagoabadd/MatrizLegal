import React from "react";
import { Link } from "react-router-dom";
import "./SideBarMenu.css";
import GroupIcon from "@mui/icons-material/Group";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/HomeWork";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ApartmentIcon from "@mui/icons-material/Apartment";

export const SideBarMenu: React.FC = () => {
  return (
    <div className="side-bar-container">
      <div className="side-bar-content">
        <h1 className="side-bar-header">
          <MenuIcon
            sx={{
              marginRight: "10px",
              width: "20px",
            }}
          />
          Panel de control
        </h1>
        <nav className="side-bar-buttons-list">
          <Link to="/home" className="side-bar-button-container">
            <HomeIcon
              sx={{
                marginRight: "10px",
                width: "20px",
              }}
            />
            Home
          </Link>
          <Link to="/requisitos" className="side-bar-button-container">
            <BeenhereIcon
              sx={{
                marginRight: "10px",
                width: "20px",
              }}
            />
            Listar Requisitos
          </Link>
          <Link to="/crear-requisito" className="side-bar-button-container">
            <AddToPhotosIcon
              sx={{
                marginRight: "10px",
                width: "20px",
              }}
            />
            Crear Requisito
          </Link>
          <Link to="/home" className="side-bar-button-container">
            <LibraryBooksIcon sx={{ marginRight: "10px", width: "20px" }} />
            Normativas
          </Link>
          <Link to="/usuarios" className="side-bar-button-container">
            <GroupIcon
              sx={{
                marginRight: "10px",
                width: "20px",
              }}
            />
            Cliente
          </Link>
          <Link to="/plantas" className="side-bar-button-container">
            <ApartmentIcon
              sx={{
                marginRight: "10px",
                width: "20px",
              }}
            />
            Plantas
          </Link>
          <Link to="/" className="side-bar-button-container"></Link>
          <Link to="/" className="side-bar-button-container"></Link>
          <Link to="/" className="side-bar-button-container"></Link>
        </nav>
      </div>
    </div>
  );
};
