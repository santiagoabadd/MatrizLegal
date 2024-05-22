import axios from "axios";
import React, { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./Categorias.css";
import { CategoriasRequisitos } from "./CategoriasRequisitos";

interface CategoriasProps {
  selectedCategory: string;
}

interface requisitoObjeto {
  categoryId: number;
  category: string;
  imageId: string;
}

export const Categorias: React.FC<CategoriasProps> = ({ selectedCategory }) => {

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryImagenId, setSelectedCategoryImagenId] = useState<string>("");
    const [showMainOptions, setShowMainOptions] = useState<boolean>(true);
    const [showBackButton, setShowBackButton] = useState<boolean>(false);

    const handleCategoryClick = (categoryId: string,categoryImagenId: string) => {
        setSelectedCategoryId(categoryId);
        setSelectedCategoryImagenId(categoryImagenId);
        setShowBackButton(true);
        setShowMainOptions(false); 
      };

      const handleBackClick = () => {
        setSelectedCategoryId(""); 
        setShowMainOptions(true); 
        setShowBackButton(false); 
      };
  
  

 

  const imagesContext = require.context('../../../../assets/iconosCategoria', false, /\.(png|jpe?g|svg)$/);


const images: { [key: string]: string } = {};

imagesContext.keys().forEach((imagePath: string) => {
  const imageName = imagePath.replace('./', '');
  images[imageName] = imagesContext(imagePath);
});


  const [categories, setCategories] = useState<requisitoObjeto[]>([]);

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
   
    loadCategories();
  }, [selectedCategory]);

  const loadCategories = async () => {
    let url = "http://localhost:8080/category/tipo/MA";

    if (selectedCategory) {
      url = `http://localhost:8080/category/tipo/${selectedCategory}`;
    }

    try {
      const result = await axios.get<requisitoObjeto[]>(url, { headers });
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return (
    <div>
      <div className="button-home">
      {showBackButton && (
        <ArrowBackIcon className="back_button" onClick={handleBackClick}/>
        
      )} 
      </div>
     
    {showMainOptions && (
    <div className="categories-container">
      
      {categories.map((category, index) => (

        <div onClick={() =>  handleCategoryClick(`${category.categoryId.toString()}`,`${category.imageId}`)} className="category-item">
          <div className="category-item-icon"><img className="category-item-icon-img" src={images[`${category.imageId}.png`]} alt="" /></div>
          <div className="category-item-title">{category.category}</div>


        </div>

      ))}
     
      

    </div>
    )}
    {selectedCategoryId && <CategoriasRequisitos selectedCategoryId={selectedCategoryId} selectedCategoryIdImagen={selectedCategoryImagenId} />}
    </div>
  );
};




