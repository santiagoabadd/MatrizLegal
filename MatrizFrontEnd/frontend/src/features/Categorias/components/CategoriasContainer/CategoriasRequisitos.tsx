import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Categorias.css";


interface CategoriasProps {
    selectedCategoryId: string;
    selectedCategoryIdImagen: string;
    selectedCategory:string;
}

interface requisitoObjeto {
    title: string;
    requirementId: number;
    compliance:string;
}

export const CategoriasRequisitos: React.FC<CategoriasProps> = ({ selectedCategoryId, selectedCategoryIdImagen,selectedCategory }) => {





   // Contexto de importación de todas las imágenes de la carpeta `iconosCategoria`
const imagesContext = require.context('../../../../assets/iconosCategoria', false, /\.(png|jpe?g|svg)$/);

// Objeto para almacenar las rutas de las imágenes, donde la clave es el nombre del archivo y el valor es la ruta de la imagen
const images: { [key: string]: string } = {};

// Iterar sobre las claves del contexto de importación y llenar el objeto images con el nombre del archivo y la ruta de la imagen
imagesContext.keys().forEach((imagePath: string) => {
    // Obtener el nombre del archivo eliminando './' del inicio del nombre de la ruta
    const imageName = imagePath.replace('./', '');
    // Almacenar la ruta de la imagen en el objeto images usando el nombre del archivo como clave
    images[imageName] = imagesContext(imagePath);
});

    const [requirements, setRequirements] = useState<requisitoObjeto[]>([]);

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {

        loadRequirements();
    }, [selectedCategoryId]);

    const loadRequirements = async () => {
        let url = "http://localhost:8080/requirement/category/52";

        if (selectedCategoryId) {
            url = `http://localhost:8080/requirement/category/${selectedCategoryId}`;
        }

        try {
            const result = await axios.get<requisitoObjeto[]>(url, { headers });
            setRequirements(result.data);
        } catch (error) {
            console.error("Error fetching requirements:", error);
        }
    };
    return (
        <div className="categories-container">

            {requirements.map((requirement, index) => (
                <Link to={`/requisito/${requirement.requirementId}`}>
                <div className="category-item">
          <div className={`category-item-icon-${selectedCategory}-${requirement.compliance}`}><img className="category-item-icon-img" src={images[`${selectedCategoryIdImagen}.png`]} alt="" /></div>
          <div className="category-item-title">{requirement.title}</div>


        </div>
        </Link>
        

      ))}
     

    </div>
  );
};





