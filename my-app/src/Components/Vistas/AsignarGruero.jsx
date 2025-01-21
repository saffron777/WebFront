import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './sidebar.css';
import Sidebar from '../sidebar';
import Header from '../header';
import grueroPhoto from '../Assets/gruero-photo.png';
import { db } from '../../firebaseconfig.js';
import { collection, addDoc } from 'firebase/firestore';

function AsignarGruero() {
  const [grueros, setGrueros] = useState([]);
  const [error, setError] = useState(null);
  const [incidente, setIncidente] = useState(null);
  const [directions, setDirections] = useState({});
  const [distances, setDistances] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  const apiKey = "AIzaSyC5WcTJIPfA-cdgqtnY5cnCD-KqxIVASAM";

  const fetchIncidente = async () => {
    try {
      const response = await fetch(`http://localhost:5132/api/OrdenDeServicio/${orderId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del incidente');
      }
      const data = await response.json();
      setIncidente(data);
    } catch (err) {
      setError('Error al obtener los datos del incidente');
      console.error(err);
    }
  };

  const fetchGrueros = async () => {
    try {
      const response = await fetch('http://localhost:5132/api/Conductor');
      if (!response.ok) {
        throw new Error('Error al obtener los grueros');
      }
      const data = await response.json();
      setGrueros(data);
    } catch (err) {
      setError('Error al obtener los grueros');
      console.error(err);
    }
  };

  const isValidCoordinates = (latitud, longitud) => {
    return !isNaN(latitud) && !isNaN(longitud) && latitud >= -90 && latitud <= 90 && longitud >= -180 && longitud <= 180;
  };

  const getPlaceName = async (latitud, longitud) => {
    if (!isValidCoordinates(latitud, longitud)) {
      return 'Ubicación no válida';
    }

    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${apiKey}`;
      const response = await fetch(geocodeUrl);

      if (!response.ok) {
        return 'Error al obtener ubicación';
      }

      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return 'Ubicación no disponible';
      }
    } catch (error) {
      console.error('Error al obtener el nombre del lugar:', error);
      return 'Error al obtener ubicación';
    }
  };

  const calculateDistances = () => {
    if (!incidente || !incidente.latitudIncidente || !incidente.longitudIncidente) return;

    const { latitudIncidente, longitudIncidente } = incidente;
    const R = 6371; // Radio de la Tierra en kilómetros

    const calculateHaversine = (lat1, lon1, lat2, lon2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const newDistances = {};
    grueros.forEach((gruero) => {
      if (gruero.latitud && gruero.longitud && isValidCoordinates(gruero.latitud, gruero.longitud)) {
        newDistances[gruero.id] = calculateHaversine(
          latitudIncidente,
          longitudIncidente,
          gruero.latitud,
          gruero.longitud
        );
      } else {
        newDistances[gruero.id] = Infinity; // Si las coordenadas no son válidas
      }
    });

    setDistances(newDistances);
  };

  useEffect(() => {
    if (orderId) {
      fetchIncidente();
    }
    fetchGrueros();
  }, [orderId]);

  useEffect(() => {
    if (grueros.length > 0) {
      calculateDistances();
    }
  }, [grueros, incidente]);

  useEffect(() => {
    const resolveAddresses = async () => {
      const newDirections = {};

      for (const gruero of grueros) {
        if (gruero.latitud && gruero.longitud && isValidCoordinates(gruero.latitud, gruero.longitud)) {
          if (!directions[gruero.id]) {
            const address = await getPlaceName(gruero.latitud, gruero.longitud);
            newDirections[gruero.id] = address || 'Ubicación no disponible';
          }
        } else {
          newDirections[gruero.id] = 'Coordenadas no válidas';
        }
      }

      setDirections((prevDirections) => ({ ...prevDirections, ...newDirections }));
    };

    if (grueros.length > 0) {
      resolveAddresses();
    }
  }, [grueros]);

  const handleAssignGruero = async (grueroId) => {
    if (!orderId) {
      alert('No se ha encontrado un ID de orden válido.');
      return;
    }

    const solicitudData = {
      IdConductor: grueroId,
      IdOrden: orderId,
    };

    try {
      await addDoc(collection(db, 'Solicitudes'), solicitudData);
      alert('Solicitud registrada correctamente en Firebase.');
    } catch (error) {
      console.error('Error registrando la solicitud:', error);
      alert('Hubo un error al registrar la solicitud.');
    }
  };

  const sortedGrueros = grueros.sort((a, b) => {
    const distanceA = distances[a.id] || Infinity;
    const distanceB = distances[b.id] || Infinity;
    return distanceA - distanceB; // Orden ascendente
  });

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <div className="main-content">
        <h2>Grueros Cercanos</h2>
        {error && <p>{error}</p>}
        <div className="gruero-list">
          {sortedGrueros.map((gruero) => (
            <div className="gruero-card" key={gruero.id}>
              <img src={grueroPhoto} alt="Gruero" className="gruero-photo" />
              <div className="gruero-info">
                <h3>{gruero.nombre} {gruero.apellido}</h3>
                <p>Ubicación: {directions[gruero.id] || 'Cargando ubicación...'}</p>
                {orderId && <p>Orden por Asignar: {orderId}</p>}
                <p>Distancia al incidente: {distances[gruero.id]?.toFixed(2) || 'N/A'} km</p>
              </div>
              <div className="gruero-actions">
                <button className="assign-btn" onClick={() => handleAssignGruero(gruero.id)}>
                  Asignar Gruero
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AsignarGruero;
