import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css'; // Estilos
import Header from '../header';
import Sidebar from '../sidebar';

function VehiculosCRUD() {
  const navigate = useNavigate();

  const handleCrearGrua = () => {
    navigate('/gruas'); 
  };

  const handleCrearVehiculoParticular = () => {
    navigate('/vehiculoparticular'); // Navegar a la ruta de estatus de órdenes
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <Header /> {/* Usando el componente Header para Avatar y notificaciones */}
      <div className="">
        {/* Contenido principal */}
        <div className="main-content">
          <h2>Gestionar Vehiculos</h2>

          {/* Botones grandes */}
          <div className="button-grid">
            <button className="large-button" onClick={handleCrearGrua}>
              <div className="button-icon">🏗️</div>
              <div className="button-title">Gestionar Gruas</div>
            </button>

            <button className="large-button" onClick={handleCrearVehiculoParticular}>
              <div className="button-icon">🚗</div>
              <div className="button-title">Gestionar Vehiculo Particular</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehiculosCRUD;
