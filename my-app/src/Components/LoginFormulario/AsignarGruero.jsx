import React from 'react';
import './sidebar.css'; // Estilos generales
import loginImage from '../Assets/icon-image.png';
import grueroPhoto from '../Assets/gruero-photo.png'; // Imagen de ejemplo para los gruero

import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell } from 'react-icons/fa';

function AsignarGruero() {
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

      <div className="main-content">
        <h2>Grueros Cercanos</h2>
        <div className="gruero-list">
          {/* Ejemplo de gruero */}
          <div className="gruero-card">
            <img src={grueroPhoto} alt="Gruero" className="gruero-photo" />
            <div className="gruero-info">
              <h3>Juan Pérez</h3>
              <p>Tiempo estimado: 15 min</p>
            </div>
            <div className="gruero-actions">
              <button className="assign-btn">Asignar Gruero</button>
              <button className="details-btn">Mostrar Detalles</button>
            </div>
          </div>

          {/* Repite el componente de gruero para más entradas */}
          <div className="gruero-card">
            <div className="gruero-info">
              <h3>María López</h3>
              <p>Tiempo estimado: 20 min</p>
            </div>
            <div className="gruero-actions">
              <button className="assign-btn">Asignar Gruero</button>
              <button className="details-btn">Mostrar Detalles</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsignarGruero;
