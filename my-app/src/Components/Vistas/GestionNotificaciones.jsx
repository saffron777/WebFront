import React, { useState } from 'react';
import './sidebar.css'; // Estilos generales
import Sidebar from '../sidebar.jsx';
import { db } from '../../firebaseconfig.js';
import { collection, addDoc } from 'firebase/firestore'; // Importa Firestore

function NotificationPanel() {
  const [message, setMessage] = useState('');
  const [driverType, setDriverType] = useState('internos');
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [recurrence, setRecurrence] = useState('');

  const handleSendNotification = async () => {
    if (!message) {
      alert('El mensaje no puede estar vacío.');
      return;
    }

    // Datos de la notificación
    const notificationData = {
      message,
      driverType,
      isRecurrent,
      recurrence: isRecurrent ? recurrence : null,
      timestamp: new Date().toISOString(), // Fecha y hora de creación
    };

    try {
      // Guarda en Firestore
      await addDoc(collection(db, 'notificationes'), notificationData);
      alert('Notificación registrada correctamente en Firebase.');
      // Limpia los campos del formulario
      setMessage('');
      setDriverType('internos');
      setIsRecurrent(false);
      setRecurrence('');
    } catch (error) {
      console.error('Error registrando la notificación:', error);
      alert('Hubo un error al registrar la notificación.');
    }
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className="">


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
    </div>
  );
}

export default NotificationPanel;

