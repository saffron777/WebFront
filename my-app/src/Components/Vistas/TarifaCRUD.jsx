import React from 'react';
import './sidebar.css'; // Estilos 
import Sidebar from '../sidebar';


function TarifaCRUD() {
  return (
    
<div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className=""></div>

      {/* Tabla CRUD */}
      <div className="main-content">
        <h2>Tarifa</h2>
        
        {/* Botón Agregar Usuario */}
        <div className="add-user-btn-container">
          <button className="add-user-btn">Agregar Tarifa</button>
        </div>
        

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Distancia max</th>
              <th>Costo x km ad</th>
              <th>Costo servicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Basico</td>
              <td>60km</td>
              <td>2$</td>
              <td>30$</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            
             
          
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TarifaCRUD;