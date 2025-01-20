// Importación de dependencias necesarias
import React, { useState, useEffect } from 'react'; // useState y useEffect para manejar estados y efectos secundarios
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing para gestionar las rutas de la aplicación
import Keycloak from 'keycloak-js'; // Librería de Keycloak para la autenticación
import Sidebar from './Components/sidebar'; // Componente de la barra lateral
import Header from './Components/header'; // Componente del encabezado
import { RolesProvider } from './RolesContext'; // Importación del provider para manejar el contexto de roles

// Rutas de los diferentes componentes
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
import AseguradoCRUD from './Components/Vistas/AseguradoCRUD';
import ConductorCRUD from './Components/Vistas/ConductorCRUD';
import OperadorCRUD from './Components/Vistas/OperadorCRUD';

import './App.css'; // Importación de estilos
import CRUDUsuarioProveedor from './Components/Vistas/UserProveedor';
import VehiculosCRUD from './Components/Vistas/PanelVehiculos';
import VehiculoAseguradoCRUD from './Components/Vistas/VehiculoParticularCRUD';
import AsignarGruero from './Components/Vistas/AsignarGruero';

function App() {
  // Establecemos los estados para Keycloak y la autenticación
  const [keycloak, setKeycloak] = useState(null); // Guarda la instancia de Keycloak
  const [authenticated, setAuthenticated] = useState(false); // Determina si el usuario está autenticado

  // useEffect para inicializar Keycloak al cargar la aplicación
  useEffect(() => {
    const kc = new Keycloak({
      url: "https://gruasucab-u31026.vm.elestio.app/", // URL del servidor de Keycloak
      realm: "GruasUcab", // Nombre del realm en Keycloak
      clientId: "frontweb", // Client ID que se usa para conectar con Keycloak
    });

    // Inicialización de Keycloak
    kc.init({
      onLoad: 'login-required', // Si no está autenticado, redirige a login
      checkLoginIframe: false, // Desactiva la comprobación en iframe de la sesión de usuario
    })
      .then(authenticated => {
        setAuthenticated(authenticated); // Establece si el usuario está autenticado
        setKeycloak(kc); // Guarda la instancia de Keycloak

        // Obtener los roles del usuario desde el token de Keycloak y guardarlos en el localStorage
        const userRoles = kc?.tokenParsed?.realm_access?.roles || []; // Extrae roles del token
        localStorage.setItem('userRoles', JSON.stringify(userRoles)); // Almacena los roles en localStorage
      })
      .catch(error => {
        console.error('Error al inicializar Keycloak:', error); // Maneja errores de inicialización
      });
  }, []); // Este efecto solo se ejecuta una vez al inicio

  // Si Keycloak aún no está inicializado, mostramos un mensaje de conexión
  if (!keycloak) {
    return <div>Conectando con Keycloak...</div>;
  }

  // Si no está autenticado, mostramos un mensaje indicando que no está autenticado
  if (!authenticated) {
    return <div>No autenticado</div>;
  }

  // Si está autenticado, renderizamos la aplicación
  return (
    <RolesProvider>
      <Router> {/* Router para manejar las rutas */}
        <div className="app">
          <Header keycloak={keycloak} /> {/* Pasa Keycloak al Header */}
          <Sidebar /> {/* Sidebar, con acceso a la barra lateral */}
          <div className="content">
            {/* Definimos las rutas para las diferentes vistas de la aplicación */}
            <Routes>
              <Route path="/users" element={<UsersCRUD />} />
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
              <Route path="/conductor" element={<ConductorCRUD />} />
              <Route path="/operador" element={<OperadorCRUD />} />
              <Route path="/proveedorcrud" element={<CRUDUsuarioProveedor />} />
              <Route path="/vehicles" element={<VehiculosCRUD />} />
              <Route path="/gruas" element={<VehicleCRUD />} />
              <Route path="/vehiculoparticular" element={<VehiculoAseguradoCRUD />} />
              <Route path="/asignargruero" element={<AsignarGruero />} />
            </Routes>
          </div>
        </div>
      </Router>
    </RolesProvider>
  );
}

export default App;
