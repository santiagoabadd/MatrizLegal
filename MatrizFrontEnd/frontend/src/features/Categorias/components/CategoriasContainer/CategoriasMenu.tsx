import axios from "axios";
import React, { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';


import "./CategoriasMenu.css";
import { Categorias } from "./Categorias";


export const CategoriasMenu: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [showMainOptions, setShowMainOptions] = useState<boolean>(true);
    const [showBackButton, setShowBackButton] = useState<boolean>(false);

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setShowMainOptions(false); // Ocultar las opciones principales al seleccionar una categoría
        setShowBackButton(true);
      };

      const handleBackClick = () => {
        setSelectedCategory(""); // Reiniciar la categoría seleccionada
        setShowMainOptions(true); // Volver a mostrar las opciones principales
        setShowBackButton(false); // Ocultar el botón de retroceso
      };

  const imagesContext = require.context('../../../../assets/iconosCategoria', false, /\.(png|jpe?g|svg)$/);

// Crea un objeto para almacenar las imágenes
const images: { [key: string]: string } = {};

// Itera sobre las imágenes importadas y agrégalas al objeto
imagesContext.keys().forEach((imagePath: string) => {
  const imageName = imagePath.replace('./', '');
  images[imageName] = imagesContext(imagePath);
});


  

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  

  
  return (
    <div>
        {showBackButton && (
            <HomeIcon className="home_button" onClick={handleBackClick}/>
        
      )}

    {showMainOptions && (
    <div className="categories-container">

     

        <div onClick={() => handleCategoryClick("MA")} className="category-item-menu">
          <div className="category-item-icon-menu"><img className="category-item-icon-img" src={images["1.png"]} alt="" /></div>
          <div className="category-item-title-menu">Medio Ambiente</div>
        </div>
        <div onClick={() => handleCategoryClick("SSO")} className="category-item-menu">
          <div className="category-item-icon-menu"><img className="category-item-icon-img" src={images["3.png"]} alt="" /></div>
          <div className="category-item-title-menu">Seguridad y salud ocupacional</div>
        </div>
        <div onClick={() => handleCategoryClick("OTRO")} className="category-item-menu">
          <div className="category-item-icon-menu"><img className="category-item-icon-img" src={images["2.png"]} alt="" /></div>
          <div className="category-item-title-menu">Otros</div>
        </div>

    
     

    </div>
    )}
    {selectedCategory && <Categorias selectedCategory={selectedCategory} />}
    </div>
  );
};
