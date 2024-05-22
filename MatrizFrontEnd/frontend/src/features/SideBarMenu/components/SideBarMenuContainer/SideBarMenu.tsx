import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./SideBarMenu.css";
import GroupIcon from "@mui/icons-material/Group";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/HomeWork";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HasuLogo from '../../../../assets/hasuLogo.png'

export const SideBarMenu: React.FC = () => {

  
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    
  
    if (token) {
      axios.get('http://localhost:8080/viewUserRole', {headers})
      .then(response => {
        if(response.data==true){
          console.log("admin");
        }else{
          console.log("noadmin");
        }

        setIsAdmin(response.data); // Supongamos que el rol es un string
      })
      .catch(error => {
        console.error('Error obteniendo el rol del usuario:', error);
      });
    }
  }, []);

  return (
    <div className="side-bar-container">
      <div className="side-bar-content">
        <div className='side-bar-header-container'>
          
          
        </div>
        <h1 className="side-bar-header-2">
         
            NAVIGATION
          </h1>
        <nav className="side-bar-buttons-list">
          <Link to="/home" className="side-bar-button-container">
            <HomeIcon className='side-bar-button-svg'
              sx={{
                marginRight: "10px",
                width: "20px",
                marginLeft: "9px"
              }}
            />
            Home
          </Link>
          <Link to="/vencimientos" className="side-bar-button-container">
            <CalendarMonthIcon
              sx={{
                marginRight: "10px",
                width: "20px",
                marginLeft: "7px"
              }}
            />
            Vencimientos
          </Link>
          
          <Link to="/stats" className="side-bar-button-container">
            <LeaderboardIcon
              sx={{
                marginRight: "10px",
                width: "20px",
                marginLeft: "7px"
              }}
            />
            Estadisticas y Control

          </Link>
          <h1 className="side-bar-header-2">
         
            Requisitos
          </h1>
          <Link to="/requisitos" className="side-bar-button-container">
            <BeenhereIcon className='side-bar-button-svg'
              sx={{
                marginRight: "10px",
                width: "20px",
                marginLeft: "7px"
              }}
            />
            Listar Requisitos
          </Link>
          <Link to="/crear-requisito" className="side-bar-button-container">
            <AddToPhotosIcon
              sx={{
                marginRight: "10px",
                width: "20px",
                marginLeft: "7px"
              }}
            />
            Crear Requisito
          </Link>
          <h1 className="side-bar-header-2">
         
            Normativas
          </h1>
          <Link to="/normativas" className="side-bar-button-container">
            <LibraryBooksIcon sx={{ marginRight: "10px", width: "20px",marginLeft: "7px" }} />
            Normativas
          </Link>
          {isAdmin && (
            <Link to="/crear-normativa" className="side-bar-button-container">
              <AddToPhotosIcon
                sx={{
                  marginRight: "10px",
                  width: "20px",
                  marginLeft: "7px"
                }}
              />
              Crear Normativa
            </Link>
          )}
          <h1 className="side-bar-header-2">
         
         Cliente
       </h1>
          <Link to="/usuarios" className="side-bar-button-container">
            <GroupIcon
              sx={{
                marginRight: "10px",
                width: "20px",
                marginLeft: "9px"
              }}
            />
            Cliente
          </Link>
          <Link to="/plantas" className="side-bar-button-container">
            <ApartmentIcon
              sx={{
                marginRight: "10px",
                width: "20px",
                marginLeft: "7px"
              }}
            />
            Plantas
          </Link>
          {isAdmin && (
            <Link to="/crear-planta" className="side-bar-button-container">
              <AddToPhotosIcon
                sx={{
                  marginRight: "10px",
                  width: "20px",
                  marginLeft: "7px"
                }}
              />
              Crear Planta
            </Link>
          )}
          {isAdmin && (
            <Link to="/crear-customer" className="side-bar-button-container">
              <AddToPhotosIcon
                sx={{
                  marginRight: "10px",
                  width: "20px",
                  marginLeft: "7px"
                }}
              />
              Crear Cliente
            </Link>
          )}
          <Link to="/" className="side-bar-button-container"></Link>
          <Link to="/" className="side-bar-button-container"></Link>
          <Link to="/" className="side-bar-button-container"></Link>
        </nav>
      </div>
    </div>
  );
};
