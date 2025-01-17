import React from 'react';
import './sidebar.css'; // Estilos 
import Sidebar from '../sidebar';


function OperadorCRUD() {
  return (
    
<div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className=""></div>

      {/* Tabla CRUD */}
      <div className="main-content">
        <h2>Operador de cabina</h2>
        
        {/* Botón Agregar Usuario */}
        <div className="add-user-btn-container">
          <button className="add-user-btn">Agregar Operador</button>
        </div>
        

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Departamento</th>
              <th>Email</th>
              <th>Acciones</th>
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

export default OperadorCRUD;