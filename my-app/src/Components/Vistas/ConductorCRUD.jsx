import React from 'react';
import './sidebar.css'; // Estilos 
import Sidebar from '../sidebar';


function ConductorCRUD() {
  return (
    
<div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className=""></div>

      {/* Tabla CRUD */}
      <div className="main-content">
        <h2>Conductor</h2>
        
        {/* Botón Agregar Usuario */}
        <div className="add-user-btn-container">
          <button className="add-user-btn">Agregar Conductor</button>
        </div>
        

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Licencia</th>
              <th>Proveedor</th>
              <th>CI</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
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

export default ConductorCRUD;