import React, { useEffect, useState } from 'react';
import './sidebar.css';
import Sidebar from '../sidebar';
import Header from '../header';
import grueroPhoto from '../Assets/gruero-photo.png';
import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell } from 'react-icons/fa';

function AsignarGruero() {
  const [grueros, setGrueros] = useState([]);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState({});

  const apiKey = "AIzaSyC5WcTJIPfA-cdgqtnY5cnCD-KqxIVASAM";  // API key directamente aquí

  // Obtener la lista de grueros con latitud y longitud
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

  // Verificar si las coordenadas son válidas
  const isValidCoordinates = (latitud, longitud) => {
    return !isNaN(latitud) && !isNaN(longitud) && latitud >= -90 && latitud <= 90 && longitud >= -180 && longitud <= 180;
  };

  // Obtener el nombre del lugar basado en latitud y longitud
  const getPlaceName = async (latitud, longitud) => {
    if (!isValidCoordinates(latitud, longitud)) {
      return 'Ubicación no válida';
    }

    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${apiKey}`;
      const response = await fetch(geocodeUrl);

      if (!response.ok) {
        throw new Error('Error al obtener el nombre del lugar desde Google Maps');
      }

      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return 'Ubicación no disponible';
      }
    } catch (error) {
      console.error('Error al obtener el nombre del lugar:', error);
      return 'Error al obtener el nombre del lugar';
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetchGrueros();
  }, []);

  // Resolver las direcciones de los grueros
  const resolveAddresses = async () => {
    const newDirections = {};

    for (const gruero of grueros) {
      if (gruero.latitud && gruero.longitud) {
        const address = await getPlaceName(gruero.latitud, gruero.longitud);
        newDirections[gruero.id] = address;
      }
    }

    setDirections(newDirections);
  };

  // Llamar a la función para resolver las direcciones después de obtener los grueros
  useEffect(() => {
    if (grueros.length > 0) {
      resolveAddresses();
    }
  }, [grueros]);

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <div className="main-content">
        <h2>Grueros Cercanos</h2>
        {error && <p>{error}</p>}
        <div className="gruero-list">
          {grueros.map((gruero) => (
            <div className="gruero-card" key={gruero.id}>
              <img src={grueroPhoto} alt="Gruero" className="gruero-photo" />
              <div className="gruero-info">
                <h3>{gruero.nombre} {gruero.apellido}</h3>
                <p>Tiempo estimado: 15 min</p>
                <p>Ubicación: {directions[gruero.id] || 'Cargando ubicación...'}</p>
              </div>
              <div className="gruero-actions">
                <button className="assign-btn">Asignar Gruero</button>
                <button className="details-btn">Mostrar Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AsignarGruero;
