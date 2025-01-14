import React, { useState, useEffect } from 'react';
import './sidebar.css'; // Estilos generales
import Sidebar from '../sidebar';
import Header from '../header';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Iconos para acciones
import { db } from '../../firebaseconfig.js'; // Importa la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore'; // Funciones de Firestore

function SolicitudesCostosExtra() {
  const [solicitudes, setSolicitudes] = useState([]); // Estado para almacenar las solicitudes

  // Obtener los datos de la colección 'extracost' en Firestore
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'extracost'));
        const solicitudesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSolicitudes(solicitudesData); // Establecer los datos en el estado
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };

    fetchSolicitudes(); // Llamar a la función para obtener las solicitudes
  }, []);

  // Funciones para aprobar o rechazar
  const handleApprove = (id) => {
    console.log(`Solicitud ${id} aprobada`);
    // Lógica para aprobar la solicitud
  };

  const handleReject = (id) => {
    console.log(`Solicitud ${id} rechazada`);
    // Lógica para rechazar la solicitud
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <Header /> {/* Usando el componente Header */}
      <div className="main-content">
        <h2>Solicitudes Pendientes</h2>
        <div className="solicitudes-list">
          {solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => (
              <div className="solicitud-card" key={solicitud.id}>
                <div className="solicitud-info">
                  <h3>{solicitud.descripcion}</h3>
                  <p>Precio: {solicitud.precio}</p>
                  <p className="solicitud-fecha">Fecha: {solicitud.fecha}</p>
                </div>
                <div className="solicitud-actions">
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(solicitud.id)}
                  >
                    <FaCheckCircle /> Aprobar
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(solicitud.id)}
                  >
                    <FaTimesCircle /> Rechazar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay solicitudes pendientes</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SolicitudesCostosExtra;
