import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/sidebar';
import UsersCRUD from './Components/Vistas/UsersCRUD';
import ServiceOrder from './Components/Vistas/ServiceOrder';
import NotificationPanel from './Components/Vistas/GestionNotificaciones';
import CreateServiceOrder from './Components/Vistas/CreateServiceOrder';
import VisualizarProgreso from './Components/Vistas/VisualizarProgreso';
import CalcularCosto from './Components/Vistas/CalcularCosto'; // Nueva interfaz

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/users" element={<UsersCRUD />} />
            <Route path="/orders" element={<ServiceOrder />} />
            <Route path="/notifications" element={<NotificationPanel />} />
            <Route path="/create-order" element={<CreateServiceOrder />} />
            <Route path="/order-status" element={<VisualizarProgreso />} />
            <Route path="/calculate-cost" element={<CalcularCosto />} /> {/* Nueva ruta */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

