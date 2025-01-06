import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from './Assets/icon-image.png';
import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell, FaTag, FaMoneyBill } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={loginImage} alt="Logo" className="sidebar-logo" />
      </div>
      <ul className="nav-items">
        <li>
          <Link to="/users">
            <FaUser className="nav-icon" /> Usuarios
          </Link>
        </li>
        <li>
          <Link to="/departments">
            <FaBuilding className="nav-icon" /> Departamentos
          </Link>
        </li>
        <li>
          <Link to="/vehicles">
            <FaCar className="nav-icon" /> Vehículos
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <FaClipboardList className="nav-icon" /> Órdenes
          </Link>
        </li>
        <li>
          <Link to="/providers">
            <FaTruck className="nav-icon" /> Proveedores
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <FaBell className="nav-icon" /> Notificaciones
          </Link>
        </li>
        <li>
          <Link to="/tarifa">
            <FaTag className="nav-icon" /> Tarifas
          </Link>
        </li>
        <li>
          <Link to="/additional-costs">
            <FaMoneyBill className="nav-icon" /> Costos Adicionales
          </Link>
        </li>
      </ul>
      
      <button className="logout-button">Cerrar Sesión</button>
      
    </div>
  );
};

export default Sidebar;

