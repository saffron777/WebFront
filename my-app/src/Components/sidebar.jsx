import React from 'react';
import loginImage from './Assets/icon-image.png';
import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell } from 'react-icons/fa';

const Sidebar = () => {
  return (
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
        <li>
          <a href="#">
            <FaBell className="nav-icon" /> Tarifas
          </a>
        </li>
      </ul>
      <button className="logout-button">Cerrar Sesión</button>
    </div>
  );
};

export default Sidebar;
