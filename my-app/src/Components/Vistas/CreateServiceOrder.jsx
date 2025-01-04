import React from 'react';
import './sidebar.css'; // Estilos
import Sidebar from '../sidebar'; 


// Importa íconos desde una librería como react-icons o material-icons
import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell } from 'react-icons/fa';

function CreateServiceOrder() {
        return (
          <div className="container">
          <Sidebar /> {/* Usando el componente Sidebar */}
          <div className="">

      <div className="main-content">
        <h2>Crear Orden de Servicio</h2>
        <div className="form-container">
          <form>
            <div className="form-group">
              <label htmlFor="beneficiary">Beneficiario</label>
              <input type="text" id="beneficiary" name="beneficiary" placeholder="Nombre del beneficiario" required />
            </div>
            <div className="form-group">
              <label htmlFor="origin">Dirección de Origen</label>
              <input type="text" id="origin" name="origin" placeholder="Dirección de origen" required />
            </div>
            <div className="form-group">
              <label htmlFor="destination">Dirección de Destino</label>
              <input type="text" id="destination" name="destination" placeholder="Dirección de destino" required />
            </div>
            <button type="submit" className="submit-btn">Crear Orden</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CreateServiceOrder;
