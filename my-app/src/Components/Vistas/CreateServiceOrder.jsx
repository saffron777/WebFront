import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css'; // Estilos
import Header from '../header';
import Sidebar from '../sidebar';

function CreateServiceOrder() {
  const navigate = useNavigate();

  const handleCreateOrder = (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    navigate('/calculate-cost'); // Navegar a la nueva ruta
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <Header /> {/* Usando el componente Header para Avatar y notificaciones */}
      <div className="">
        <div className="main-content">
          <h2>Crear Orden de Servicio</h2>
          <div className="form-container">
            <form onSubmit={handleCreateOrder}>
              <div className="form-group">
                <label htmlFor="beneficiary">Beneficiario</label>
                <input
                  type="text"
                  id="beneficiary"
                  name="beneficiary"
                  placeholder="Nombre del beneficiario"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="origin">Dirección de Origen</label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  placeholder="Dirección de origen"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="destination">Dirección de Destino</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="Dirección de destino"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Crear Orden
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateServiceOrder;
