import React from 'react';
import './sidebar.css'; // Estilos generales
import Sidebar from '../sidebar'
import grueroPhoto from '../Assets/gruero-photo.png'; // Imagen de ejemplo para los gruero

import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell } from 'react-icons/fa';

function AsignarGruero() {
  return (
   
<div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className="">


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
    </div>
  );
}

export default AsignarGruero;
