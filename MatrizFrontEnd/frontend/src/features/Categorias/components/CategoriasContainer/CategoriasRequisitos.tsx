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





    const imagesContext = require.context('../../../../assets/iconosCategoria', false, /\.(png|jpe?g|svg)$/);

    const images: { [key: string]: string } = {};

    imagesContext.keys().forEach((imagePath: string) => {
        const imageName = imagePath.replace('./', '');
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





