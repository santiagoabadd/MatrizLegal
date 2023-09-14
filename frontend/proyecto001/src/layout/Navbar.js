import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
     <div className="container-fluid">
       <a className="navbar-brand" href="#">Navbar</a>
       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <Link className="btn btn-dark" to= "/requirements">Ver Requisitos</Link>
       <Link className="btn btn-dark" to= "/plants">Ver Plantas</Link>
       <Link className="btn btn-dark" to= "/categorys">Ver Categorías</Link>
       <Link className="btn btn-dark" to= "/customers">Ver Clientes</Link>
       <Link className="btn btn-dark" to= "/normativas">Ver Normativas</Link>
       <Link className="btn btn-dark" to= "/addrequirement">Añadir Requisito</Link>
       <Link className="btn btn-dark" to= "/addcustomer">Añadir Cliente</Link>
       <Link className="btn btn-dark" to= "/addcategory">Añadir Categoría</Link>
       <Link className="btn btn-dark" to= "/addplant">Añadir Planta</Link>
       <Link className="btn btn-dark" to= "/addnormativa">Añadir Normativa</Link>
     </div>
   </nav>
  );
}


