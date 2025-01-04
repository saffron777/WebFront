import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import Sidebar from '../sidebar';
import './sidebar.css'; // Estilos generales

// Componente principal
const CalcularCosto = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directionsResponse, setDirectionsResponse] = useState(null);

  // Función para calcular la ruta
  const calculateRoute = () => {
    if (origin && destination) {
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING, // Puedes cambiar el modo de transporte si lo deseas
        },
        (result, status) => {
          if (status === 'OK') {
            setDirectionsResponse(result);
          } else {
            alert('No se pudo calcular la ruta. Intenta de nuevo.');
          }
        }
      );
    } else {
      alert('Por favor ingresa tanto la dirección de origen como la de destino.');
    }
  };

  return (
   
<div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className="main-content">


      {/* Mapa y formulario */}
      <div className="map-container">
        <h2>Calculadora de Ruta</h2>

        <div className="form-container">
          <input
            type="text"
            placeholder="Dirección de Origen"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Dirección de Destino"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button onClick={calculateRoute}>Calcular Ruta</button>
        </div>

        {/* Cargar el mapa */}
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={{ lat: 19.432608, lng: -99.133209 }} // Centrado por defecto en Ciudad de México
            zoom={12}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
    </div>
  );
};

export default CalcularCosto;
