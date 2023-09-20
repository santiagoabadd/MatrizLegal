import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ListCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const token = localStorage.getItem('jwtToken');

      // Configura un objeto de cabecera con el token JWT
      const headers = {
        Authorization: `Bearer ${token}`,
      };

  const loadCustomers = async () => {
    const result = await axios.get('http://localhost:8080/customer',{headers}); // Ajusta la URL según tu configuración de servidor
    setCustomers(result.data);
  };

  const deleteCustomer = async (id) => {
    await axios.delete(`http://localhost:8080/customer/${id}`,{headers}); // Ajusta la URL según tu configuración de servidor
    loadCustomers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Compañía</th>
              <th scope="col">Habilitado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{customer.company}</td>
                <td>{customer.enabled ? 'Sí' : 'No'}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewcustomer/${customer.customerId}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editcustomer/${customer.customerId}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCustomer(customer.customerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
