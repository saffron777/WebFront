import React, { useState } from 'react';
import './sidebar.css'; // Estilos generales
import loginImage from '../Assets/icon-image.png';
import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell } from 'react-icons/fa';

function NotificationPanel() {
  const [message, setMessage] = useState('');
  const [driverType, setDriverType] = useState('internos');
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [recurrence, setRecurrence] = useState('');

  const handleSendNotification = () => {
    const notificationData = {
      message,
      driverType,
      isRecurrent,
      recurrence: isRecurrent ? recurrence : null,
    };
    console.log('Notificación enviada:', notificationData);
    alert('Notificación enviada correctamente');
  };

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
        <h2>Panel de Notificaciones</h2>
        <div className="notification-form">
          <textarea
            className="message-input"
            placeholder="Escribe el mensaje de la notificación..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="options">
            <div className="option-group">
              <label>Tipo de Conductor:</label>
              <select
                className="driver-type-select"
                value={driverType}
                onChange={(e) => setDriverType(e.target.value)}
              >
                <option value="internos">Internos</option>
                <option value="externos">Externos</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>

            <div className="option-group">
              <label>
                <input
                  type="checkbox"
                  checked={isRecurrent}
                  onChange={(e) => setIsRecurrent(e.target.checked)}
                />
                Envío Recurrente
              </label>
              {isRecurrent && (
                <input
                  className="recurrence-input"
                  type="text"
                  placeholder="Definir recurrencia (e.g., diario, semanal)"
                  value={recurrence}
                  onChange={(e) => setRecurrence(e.target.value)}
                />
              )}
            </div>
          </div>
          <button className="send-button" onClick={handleSendNotification}>
            Enviar Notificación
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationPanel;
