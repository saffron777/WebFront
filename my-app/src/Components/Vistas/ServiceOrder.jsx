import React from 'react';
import './sidebar.css'; // Estilos
import Sidebar from '../sidebar';



function ServiceOrder() {
  return (
    
<div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className="">

      {/* Contenido principal */}
      <div className="main-content">
        <h2>Gestión de Órdenes</h2>

        {/* Botones grandes */}
        <div className="button-grid">
          <button className="large-button">
            <div className="button-icon">➕</div>
            <div className="button-title">Crear Orden</div>
          </button>

          <button className="large-button">
            <div className="button-icon">📋</div>
            <div className="button-title">Ver Estatus de Órdenes</div>
          </button>

          <button className="large-button">
            <div className="button-icon">⚙️</div>
            <div className="button-title">Gestionar Órdenes</div>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ServiceOrder;