import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css'; // Estilos
import Header from '../header';
import Sidebar from '../sidebar';

function ServiceOrder() {
  const navigate = useNavigate();

  const handleCrearConductor = () => {
    navigate('/conductor'); 
  };

  const handleCrearOperador = () => {
    navigate('/operador'); // Navegar a la ruta de estatus de órdenes
  };
  const handleCrearProveedor = () => {
    navigate('/proveedorcrud'); // Navegar a la ruta de estatus de órdenes
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <Header /> {/* Usando el componente Header para Avatar y notificaciones */}
      <div className="">
        {/* Contenido principal */}
        <div className="main-content">
          <h2>Gestión de Usuarios</h2>

          {/* Botones grandes */}
          <div className="button-grid">
            <button className="large-button" onClick={handleCrearOperador}>
              <div className="button-icon">👩🏻‍💻</div>
              <div className="button-title">Gestionar Operador</div>
            </button>

            <button className="large-button" onClick={handleCrearConductor}>
              <div className="button-icon">👷🏻‍♂️</div>
              <div className="button-title">Gestionar Conductor</div>
            </button>

            <button className="large-button" onClick={handleCrearProveedor}>
              <div className="button-icon">👤</div>
              <div className="button-title">Gestionar Proveedor</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceOrder;
