import React from 'react';
import './sidebar.css'; // Estilos 
import loginImage from '../Assets/icon-image.png';

// Importa íconos desde una librería como react-icons o material-icons
import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell } from 'react-icons/fa';

function Sidebar() {
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

      {/* Tabla CRUD */}
      <div className="main-content">
        <h2>Usuarios</h2>
        
        {/* Botón Agregar Usuario */}
        <div className="add-user-btn-container">
          <button className="add-user-btn">Agregar Usuario</button>
        </div>
        

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th> {/* Columna de Rol agregada */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Juan Pérez</td>
              <td>juan@example.com</td>
              <td>Administrador</td> {/* Ejemplo de rol */}
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Ana Gómez</td>
              <td>ana@example.com</td>
              <td>Usuario</td> {/* Ejemplo de rol */}
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Carlos López</td>
              <td>carlos@example.com</td>
              <td>Proveedor</td> {/* Ejemplo de rol */}
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>María García</td>
              <td>maria@example.com</td>
              <td>Usuario</td> {/* Ejemplo de rol */}
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

export default Sidebar;