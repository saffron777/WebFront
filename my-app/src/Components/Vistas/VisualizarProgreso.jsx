import React, { useState } from 'react';
import Header from '../header';
import Sidebar from '../sidebar';
import { toast } from 'react-hot-toast'; // Importar react-hot-toast

function OrdenDetalle() {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      setError(null); // Limpiar errores previos
      const response = await fetch(`http://localhost:5132/api/OrdenDeServicio/${orderId}`);
      if (!response.ok) {
        throw new Error('No se pudo encontrar la orden con el ID proporcionado.');
      }
      const data = await response.json();
      setOrderDetails(data); // Guardar los detalles de la orden
    } catch (err) {
      setOrderDetails(null);
      setError(err.message);
      toast.error('ID no encontrado.'); // Mostrar el mensaje de error usando react-hot-toast
    }
  };

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSearch = () => {
    if (orderId.trim() === '') {
      setError('Por favor, introduce un ID de orden.');
      toast.error('Por favor, introduce un ID de orden.');
      return;
    }
    fetchOrderDetails();
  };

  return (
    <div className="container">
      <Sidebar /> {/* Sidebar existente */}
      <Header /> {/* Header existente */}
      <div className="main-content">
        <h2 className="title">Buscar Detalles de la Orden</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Introduce el ID de la orden"
            value={orderId}
            onChange={handleInputChange}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            Buscar
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {orderDetails && (
          <div className="order-details">
            <h3 className="details-title">Detalles de la Orden</h3>
            <div className="details-grid">
              <p><strong>ID:</strong> {orderDetails.id}</p>
              <p><strong>Fecha de Creación:</strong> {orderDetails.fechaCreacion}</p>
              <p><strong>Estado:</strong> {orderDetails.estado}</p>
              <p><strong>Ubicación del Incidente:</strong> {orderDetails.ubicacionIncidente}</p>
              <p><strong>Ubicación del Destino:</strong> {orderDetails.ubicacionDestino}</p>
              <p><strong>Kilómetros Recorridos:</strong> {orderDetails.kilometrosRecorridos}</p>
              <p><strong>Latitud del Incidente:</strong> {orderDetails.latitudIncidente}</p>
              <p><strong>Longitud del Incidente:</strong> {orderDetails.longitudIncidente}</p>
              <p><strong>Latitud del Destino:</strong> {orderDetails.latitudDestino}</p>
              <p><strong>Longitud del Destino:</strong> {orderDetails.longitudDestino}</p>
              <p><strong>Costo Total:</strong> {orderDetails.costoTotal}</p>
              <p><strong>Costo Base:</strong> {orderDetails.costoBase}</p>
              <p><strong>Asegurado ID:</strong> {orderDetails.aseguradoId}</p>
              <p><strong>Vehículo Asegurado ID:</strong> {orderDetails.vehiculoAseguradoId}</p>
              {orderDetails.costosAdicionales.length > 0 && (
                <div>
                  <strong>Costos Adicionales:</strong>
                  <ul>
                    {orderDetails.costosAdicionales.map((costo, index) => (
                      <li key={index}>{costo}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdenDetalle;
