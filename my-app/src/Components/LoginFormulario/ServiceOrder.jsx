import React from 'react';
import './sidebar.css'; // Estilos
import loginImage from '../Assets/icon-image.png';

// Importa íconos desde una librería como react-icons o material-icons
import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell } from 'react-icons/fa';

function ServiceOrder() {
  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo">
          <img src={loginImage} alt="Logo" className="sidebar-logo" />
        </div>
        <ul className="nav-items">
          <li>
            <a href="#">
              <FaUser className="nav-icon" /> Usuarios
            </a>
          </li>
          <li>
            <a href="#">
              <FaBuilding className="nav-icon" /> Departamentos
            </a>
          </li>
          <li>
            <a href="#">
              <FaCar className="nav-icon" /> Vehículos
            </a>
          </li>
          <li>
            <a href="#">
              <FaClipboardList className="nav-icon" /> Órdenes
            </a>
          </li>
          <li>
            <a href="#">
              <FaTruck className="nav-icon" /> Proveedores
            </a>
          </li>
          <li>
            <a href="#">
              <FaBell className="nav-icon" /> Notificaciones
            </a>
          </li>
        </ul>
        <button className="logout-button">Cerrar Sesión</button>
      </div>

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
  );
}

export default ServiceOrder;