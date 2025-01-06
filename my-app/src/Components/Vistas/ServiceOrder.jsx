import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css'; // Estilos
import Sidebar from '../sidebar';

function ServiceOrder() {
  const navigate = useNavigate();

  const handleCreateOrderClick = () => {
    navigate('/create-order'); // Navegar a la ruta de crear orden
  };

  const handleViewOrderStatusClick = () => {
    navigate('/order-status'); // Navegar a la ruta de estatus de órdenes
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className="">
        {/* Contenido principal */}
        <div className="main-content">
          <h2>Gestión de Órdenes</h2>

          {/* Botones grandes */}
          <div className="button-grid">
            <button className="large-button" onClick={handleCreateOrderClick}>
              <div className="button-icon">➕</div>
              <div className="button-title">Crear Orden</div>
            </button>

            <button className="large-button" onClick={handleViewOrderStatusClick}>
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
