import React from 'react';
import './sidebar.css'; // Estilos 
import Sidebar from '../sidebar';


function DepartamentCRUD() {
  return (
    
<div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className=""></div>

      {/* Tabla CRUD */}
      <div className="main-content">
        <h2>Departamento</h2>
        
        {/* Botón Agregar Usuario */}
        <div className="add-user-btn-container">
          <button className="add-user-btn">Agregar Departamento</button>
        </div>
        

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Gerencia</td>
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

export default DepartamentCRUD;