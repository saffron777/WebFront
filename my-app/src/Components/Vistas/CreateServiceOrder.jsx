import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import './sidebar.css'; // Estilos
import Header from '../header';
import Sidebar from '../sidebar';

function CreateServiceOrder() {
  const navigate = useNavigate();
  const [documentId, setDocumentId] = useState('');
  const [beneficiaryInfo, setBeneficiaryInfo] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const handleCreateOrder = async (event) => {
    event.preventDefault();

    try {
      // Realizar la solicitud a la API de asegurados
      const response = await fetch('http://localhost:5132/api/Asegurado', {
        method: 'GET',
        headers: {
          accept: '*/*',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener la lista de asegurados');
      }

      const asegurados = await response.json();

      // Verificar si el documento de identidad existe en la lista de asegurados
      const asegurado = asegurados.find((item) => item.documentoIdentidad === documentId);

      if (asegurado) {
        setBeneficiaryInfo(asegurado);
        localStorage.setItem('beneficiaryInfo', JSON.stringify(asegurado));

        // Solicitar los vehículos asociados al asegurado
        const vehiclesResponse = await fetch('http://localhost:5132/api/VehiculoAsegurado', {
          method: 'GET',
          headers: {
            accept: '*/*',
          },
        });

        if (!vehiclesResponse.ok) {
          throw new Error('Error al obtener los vehículos asociados');
        }

        const allVehicles = await vehiclesResponse.json();
        const aseguradoVehicles = allVehicles.filter((v) => v.aseguradoId === asegurado.id);

        if (aseguradoVehicles.length > 0) {
          setVehicles(aseguradoVehicles);
        } else {
          toast.error('No hay vehículos asociados a este asegurado.');
          setVehicles([]);
        }
      } else {
        toast.error('Este documento no pertenece a ningún asegurado.');
        setBeneficiaryInfo(null);
        setVehicles([]);
      }
    } catch (error) {
      toast.error('Hubo un problema al validar el documento. Por favor, inténtalo de nuevo.');
      console.error('Error:', error);
      setBeneficiaryInfo(null);
      setVehicles([]);
    }
  };

  const handleContinue = () => {
    if (selectedVehicle) {
      localStorage.setItem('selectedVehicle', selectedVehicle);
      navigate('/calculate-cost');
    } else {
      toast.error('Por favor, selecciona un vehículo antes de continuar.');
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <Toaster position="top-right" reverseOrder={false} /> {/* Componente Toaster */}
      <div className="main-content">
        <h2>Crear Orden de Servicio</h2>
        <div className="form-container">
          <form onSubmit={handleCreateOrder}>
            <div className="form-group">
              <label htmlFor="documentId">Documento de Identidad</label>
              <input
                type="text"
                id="documentId"
                name="documentId"
                placeholder="Ingresa el documento de identidad"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Crear Orden
            </button>
          </form>

          {vehicles.length > 0 && (
            <div className="vehicle-selection">
              <h3>Selecciona un Vehículo</h3>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un vehículo
                </option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {`${vehicle.marca} ${vehicle.modelo} - ${vehicle.placa}`}
                  </option>
                ))}
              </select>
              <button onClick={handleContinue} className="submit-btn">
                Continuar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateServiceOrder;
