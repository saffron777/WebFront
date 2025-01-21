// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from './Assets/icon-image.png';
import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell, FaTag, FaMoneyBill, FaFileContract, FaIdCard } from 'react-icons/fa';
import { useRoles } from '../RolesContext'; // Usamos el contexto de roles

const Sidebar = () => {
  const { roles } = useRoles(); // Accedemos a los roles desde el contexto

  // Verificar si el usuario tiene ciertos roles
  const isOperador = Array.isArray(roles) && roles.includes("Operador");
  const isAdministrador = Array.isArray(roles) && roles.includes("Administrador");
  const isProveedor = Array.isArray(roles) && roles.includes("Proveedor");
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={loginImage} alt="Logo" className="sidebar-logo" />
      </div>
      <ul className="nav-items">
        {isOperador && (
          <>
            <li>
              <Link to="/asegurado">
                <FaIdCard className="nav-icon" /> Asegurado
              </Link>
            </li>
            <li>
              <Link to="/orders">
                <FaClipboardList className="nav-icon" /> Órdenes
              </Link>
            </li>
            <li>
              <Link to="/costosextra">
                <FaMoneyBill className="nav-icon" /> Costos Adicionales
              </Link>
            </li>
          </>
        )}

        {isAdministrador && (
          <>
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
              <Link to="/proveedor">
                <FaTruck className="nav-icon" /> Proveedores
              </Link>
            </li>
            <li>
            <li>
              <Link to="/orders">
                <FaClipboardList className="nav-icon" /> Órdenes
              </Link>
            </li>
    
            </li>
            <li>
              <Link to="/asegurado">
                <FaIdCard className="nav-icon" /> Asegurado
              </Link>
            </li>
            <li>
              <Link to="/poliza">
                <FaFileContract className="nav-icon" /> Poliza
              </Link>
            </li>
            <li>
              <Link to="/costosextra">
                <FaMoneyBill className="nav-icon" /> Costos Adicionales
              </Link>
            </li>
          </>
        )}
          {isProveedor && (
          <>
            <li>
              <Link to="/users">
                <FaUser className="nav-icon" /> Usuarios
              </Link>
            </li>
          
            <li>
              <Link to="/vehicles">
                <FaCar className="nav-icon" /> Vehículos
              </Link>
            </li>
          </>
        )}








        <li>
          <Link to="/notifications">
            <FaBell className="nav-icon" /> Notificaciones
          </Link>
        </li>
  
        
      </ul>
      
      <button className="logout-button">Cerrar Sesión</button>
    </div>
  );
};

export default Sidebar;


