import React, { useState } from 'react';
import { GoogleMap, DirectionsRenderer, Autocomplete, LoadScript } from '@react-google-maps/api';
import Sidebar from '../sidebar';
import Header from '../header';
import './sidebar.css'; // Estilos generales

const CalcularCosto = () => {
  const [origin, setOrigin] = useState(''); // Dirección de origen
  const [destination, setDestination] = useState(''); // Dirección de destino
  const [originAutocomplete, setOriginAutocomplete] = useState(null); // Autocompletado para origen
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null); // Autocompletado para destino
  const [directionsResponse, setDirectionsResponse] = useState(null); // Respuesta de las direcciones
  const [distance, setDistance] = useState(null); // Distancia calculada

  // Configurar Autocomplete para origen
  const onOriginLoad = (autocomplete) => {
    setOriginAutocomplete(autocomplete);
  };

  const onOriginPlaceChanged = () => {
    if (originAutocomplete) {
      const place = originAutocomplete.getPlace();
      setOrigin(place.formatted_address || '');
    }
  };

  // Configurar Autocomplete para destino
  const onDestinationLoad = (autocomplete) => {
    setDestinationAutocomplete(autocomplete);
  };

  const onDestinationPlaceChanged = () => {
    if (destinationAutocomplete) {
      const place = destinationAutocomplete.getPlace();
      setDestination(place.formatted_address || '');
    }
  };

  // Calcular ruta entre origen y destino
  const calculateRoute = () => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirectionsResponse(result);
            const route = result.routes[0];
            const distanceInKm = route.legs[0].distance.value / 1000; // Convertir metros a kilómetros
            setDistance(distanceInKm.toFixed(2)); // Redondear a 2 decimales
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
      <Sidebar /> {/* Sidebar */}
      <Header /> {/* Header */}
      <div className="">
        <div className="map-container">
          <h2>Calculadora de Ruta</h2>

          {/* Asegurarnos que todo se carga bajo un solo LoadScript */}
          <LoadScript googleMapsApiKey="AIzaSyC5WcTJIPfA-cdgqtnY5cnCD-KqxIVASAM" libraries={['places']}>
            {/* Formulario de origen y destino */}
            <div className="form-container">
              {/* Campo de origen con Autocomplete */}
              <Autocomplete onLoad={onOriginLoad} onPlaceChanged={onOriginPlaceChanged}>
                <input
                  type="text"
                  placeholder="Dirección de Origen"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </Autocomplete>

              {/* Campo de destino con Autocomplete */}
              <Autocomplete onLoad={onDestinationLoad} onPlaceChanged={onDestinationPlaceChanged}>
                <input
                  type="text"
                  placeholder="Dirección de Destino"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Autocomplete>

              <button onClick={calculateRoute}>Calcular Ruta</button>
            </div>

            {/* Mostrar la distancia calculada */}
            {distance && (
              <p>
                Distancia: <strong>{distance} km</strong>
              </p>
            )}

            {/* Mostrar el mapa */}
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={{ lat: 19.432608, lng: -99.133209 }} 
              zoom={12}
            >
              {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default CalcularCosto;
