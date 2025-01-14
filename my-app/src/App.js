import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import Sidebar from './Components/sidebar';
import Header from './Components/header';
import UsersCRUD from './Components/Vistas/UsersCRUD';
import ServiceOrder from './Components/Vistas/ServiceOrder';
import NotificationPanel from './Components/Vistas/GestionNotificaciones';
import CreateServiceOrder from './Components/Vistas/CreateServiceOrder';
import VisualizarProgreso from './Components/Vistas/VisualizarProgreso';
import CalcularCosto from './Components/Vistas/CalcularCosto';
import DepartamentCRUD from './Components/Vistas/DepartmentCRUD';
import VehicleCRUD from './Components/Vistas/VehicleCRUD';
import PolizaCRUD from './Components/Vistas/PolizaCRUD';
import TarifaCRUD from './Components/Vistas/TarifaCRUD';
import SolicitudesCostosExtra from './Components/Vistas/CostosExtra';
import ProveedorCRUD from './Components/Vistas/ProveedorCRUD';
import './App.css';
import AseguradoCRUD from './Components/Vistas/AseguradoCRUD';

function App() {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const kc = new Keycloak({
      url: "http://localhost:8080",
      realm: "GruasUcab",
      clientId: "gruasucab",
    });

    kc.init({
      onLoad: 'login-required', // Redirige al login si no está autenticado
      checkLoginIframe: false,  // Desactiva la verificación con iframe
    })
      .then(authenticated => {
        setAuthenticated(authenticated);
        setKeycloak(kc); // Guarda la instancia de Keycloak para usarla
      })
      .catch(error => {
        console.error('Error al inicializar Keycloak:', error);
      });
  }, []);

  if (!keycloak) {
    return <div>Conectando con Keycloak...</div>;
  }

  if (!authenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/users" element={<UsersCRUD />} />
            <Route path="/vehicles" element={<VehicleCRUD />} />
            <Route path="/orders" element={<ServiceOrder />} />
            <Route path="/notifications" element={<NotificationPanel />} />
            <Route path="/create-order" element={<CreateServiceOrder />} />
            <Route path="/order-status" element={<VisualizarProgreso />} />
            <Route path="/calculate-cost" element={<CalcularCosto />} />
            <Route path="/departments" element={<DepartamentCRUD />} />
            <Route path="/tarifa" element={<TarifaCRUD />} />
            <Route path="/poliza" element={<PolizaCRUD />} />
            <Route path="/costosextra" element={<SolicitudesCostosExtra />} />
            <Route path="/proveedor" element={<ProveedorCRUD />} />
            <Route path="/asegurado" element={<AseguradoCRUD />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

