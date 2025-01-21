import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, Autocomplete, LoadScript } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar';
import Header from '../header';
import './sidebar.css';

const CalcularCosto = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [beneficiaryInfo, setBeneficiaryInfo] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const savedBeneficiaryInfo = localStorage.getItem('beneficiaryInfo');
    const savedVehicle = localStorage.getItem('selectedVehicle');

    if (savedBeneficiaryInfo) {
      setBeneficiaryInfo(JSON.parse(savedBeneficiaryInfo));
    }

    if (savedVehicle) {
      setSelectedVehicle(savedVehicle);
    }
  }, []);

  const onOriginLoad = (autocomplete) => setOriginAutocomplete(autocomplete);

  const onOriginPlaceChanged = () => {
    if (originAutocomplete) {
      const place = originAutocomplete.getPlace();
      setOrigin(place.formatted_address || '');
    }
  };

  const onDestinationLoad = (autocomplete) => setDestinationAutocomplete(autocomplete);

  const onDestinationPlaceChanged = () => {
    if (destinationAutocomplete) {
      const place = destinationAutocomplete.getPlace();
      setDestination(place.formatted_address || '');
    }
  };

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
            const leg = result.routes[0].legs[0];

            const routeDetails = {
              distancia: parseFloat((leg.distance.value / 1000).toFixed(2)),
              direccionOrigen: leg.start_address,
              latitudOrigen: leg.start_location.lat().toString(),
              longitudOrigen: leg.start_location.lng().toString(),
              direccionDestino: leg.end_address,
              latitudDestino: leg.end_location.lat().toString(),
              longitudDestino: leg.end_location.lng().toString(),
            };

            setDistance(routeDetails.distancia);
            setRouteDetails(routeDetails);
          } else {
            alert('No se pudo calcular la ruta. Intenta de nuevo.');
          }
        }
      );
    } else {
      alert('Por favor ingresa tanto la dirección de origen como la de destino.');
    }
  };

  const isValidUUID = (uuid) => {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
  };

  const createOrder = async () => {
    if (!routeDetails || !beneficiaryInfo || !selectedVehicle) {
      alert('Faltan datos necesarios para crear la orden de servicio.');
      return;
    }

    const orderData = {
      ubicacionIncidente: routeDetails.direccionOrigen,
      ubicacionDestino: routeDetails.direccionDestino,
      aseguradoId: beneficiaryInfo.id,
      vehiculoAseguradoId: selectedVehicle,
      kilometrosRecorridos: routeDetails.distancia || 0,
      latitudIncidente: routeDetails.latitudOrigen,
      longitudIncidente: routeDetails.longitudOrigen,
      latitudDestino: routeDetails.latitudDestino,
      longitudDestino: routeDetails.longitudDestino,
    };

    if (!isValidUUID(orderData.aseguradoId) || !isValidUUID(orderData.vehiculoAseguradoId)) {
      alert('El ID del asegurado o del vehículo no es un UUID válido.');
      return;
    }

    if (!orderData.ubicacionIncidente || !orderData.ubicacionDestino) {
      alert('Las ubicaciones de incidente o destino no están disponibles.');
      return;
    }

    console.log(orderData);

    try {
      const response = await fetch(`${API_BASE_URL}/OrdenDeServicio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Error al crear la orden de servicio: ${errorData}`);
        alert(`Error al crear la orden de servicio: ${errorData}`);
        return;
      }

      const resultText = await response.text();
      if (resultText) {
        try {
          const result = JSON.parse(resultText);
          const ordenId = result.id;
          await asignarCostoFinal(ordenId);
          console.log(result);
        } catch (jsonError) {
          console.error(`Error al parsear el JSON de la respuesta: ${jsonError}`);
          throw new Error(`Error al parsear el JSON de la respuesta: ${jsonError}`);
        }
      } else {
        console.error("La respuesta del servidor está vacía.");
        throw new Error("La respuesta del servidor está vacía.");
      }
    } catch (error) {
      alert('Error en la solicitud: ' + error.message);
      console.error(error);
    }
  };

  const asignarCostoFinal = async (orderId) => {
    try {
      const bodyRequest = JSON.stringify({
        ordenId: orderId
      });

      const response = await fetch(`${API_BASE_URL}/CostoFinal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyRequest,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Error al asignar el costo final: ${errorData}`);
        alert(`Error al asignar el costo final: ${errorData}`);
        return;
      }

      const resultText = await response.text();
      alert("Orden de servicio creada exitosamente");
      navigate(`/asignargruero?orderId=${orderId}`);
      console.log(resultText);

    } catch (error) {
      alert("Error en la solicitud: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <div className="map-container">
        <h2>Calculadora de Ruta</h2>

        {beneficiaryInfo && (
          <div className="beneficiary-info">
            <h3>Información del Asegurado</h3>
            <p><strong>ID:</strong> {beneficiaryInfo.id}</p>
            <p><strong>Nombre:</strong> {beneficiaryInfo.nombre} {beneficiaryInfo.apellido}</p>
            <p><strong>Teléfono:</strong> {beneficiaryInfo.telefono}</p>
            <p><strong>Vehículo Seleccionado:</strong> {selectedVehicle ? selectedVehicle : 'No seleccionado'}</p>
          </div>
        )}

        <LoadScript googleMapsApiKey="AIzaSyC5WcTJIPfA-cdgqtnY5cnCD-KqxIVASAM" libraries={['places']}>
          <div className="form-container">
            <Autocomplete onLoad={onOriginLoad} onPlaceChanged={onOriginPlaceChanged}>
              <input
                type="text"
                placeholder="Dirección de Origen"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Autocomplete>
            <Autocomplete onLoad={onDestinationLoad} onPlaceChanged={onDestinationPlaceChanged}>
              <input
                type="text"
                placeholder="Dirección de Destino"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>
            <button onClick={calculateRoute}>Calcular Ruta</button>
            <button onClick={createOrder}>Crear Orden de Servicio</button>
          </div>

          {routeDetails && (
            <div className="route-details">
              <h3>Detalles de la Ruta</h3>
              <p><strong>Distancia:</strong> {routeDetails.distancia} km</p>
              <p><strong>Dirección de Origen:</strong> {routeDetails.direccionOrigen}</p>
              <p><strong>Latitud de Origen:</strong> {routeDetails.latitudOrigen}</p>
              <p><strong>Longitud de Origen:</strong> {routeDetails.longitudOrigen}</p>
              <p><strong>Dirección de Destino:</strong> {routeDetails.direccionDestino}</p>
              <p><strong>Latitud de Destino:</strong> {routeDetails.latitudDestino}</p>
              <p><strong>Longitud de Destino:</strong> {routeDetails.longitudDestino}</p>
            </div>
          )}

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
  );
};

export default CalcularCosto;