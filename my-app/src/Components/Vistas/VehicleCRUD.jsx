import React from 'react';
import './sidebar.css'; // Estilos 
import Header from '../header';
import Sidebar from '../sidebar';


function VehicleCRUD() {
  return (
    
<div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <Header /> {/* Usando el componente Header para Avatar y notificaciones */}
      <div className=""></div>

      {/* Tabla CRUD */}
      <div className="main-content">
        <h2>Vehículos</h2>
        
        {/* Botón Agregar Vehiculo */}
        <div className="add-user-btn-container">
          <button className="add-user-btn">Agregar Vehiculo</button>
        </div>
        

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Matricula</th> 
              <th>Tipo</th> 
              <th>Tarifa Base</th> 
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Toyota</td>
              <td>Hilux Kavak</td>
              <td>1sd24i2</td> 
              <td>Interno</td>
              <td>30$</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            <tr>
        
            </tr>
            <tr>
        
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleCRUD;