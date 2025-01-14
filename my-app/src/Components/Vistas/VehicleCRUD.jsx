import React, { useState, useEffect } from 'react';
import './sidebar.css'; // Estilos 
import Header from '../header';
import Sidebar from '../sidebar';

function VehicleCRUD() {
  const [vehiculos, setVehiculos] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', marca: '', modelo: '', placa: '', capacidad: '', proveedorId: '' });
  const [isEditing, setIsEditing] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Cargar vehículos desde el backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/vehiculo`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Vehículos cargados:', data); // Verificar datos
        setVehiculos(data);
      })
      .catch((error) => console.error('Error al cargar vehículos:', error));
  }, []);

  // Abrir el popover para crear o editar vehículo
  const handleOpenPopover = (data = { id: '', marca: '', modelo: '', placa: '', capacidad: '', proveedorId: '' }, editing = false) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  // Cerrar el popover
  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({ id: '', marca: '', modelo: '', placa: '', capacidad: '', proveedorId: '' });
    setIsEditing(false);
  };

  // Manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario (crear o editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${API_BASE_URL}/vehiculo/${formData.id}`
      : `${API_BASE_URL}/vehiculo`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar datos');
        return response.json();
      })
      .then((newVehiculo) => {
        if (isEditing) {
          // Actualizar el vehículo editado en el estado
          setVehiculos((prevVehiculos) =>
            prevVehiculos.map((vehiculo) =>
              vehiculo.id === newVehiculo.id ? newVehiculo : vehiculo
            )
          );
        } else {
          // Agregar el nuevo vehículo al estado
          setVehiculos((prevVehiculos) => [...prevVehiculos, newVehiculo]);
        }
      })
      .catch((error) => console.error('Error al procesar la operación:', error));

    handleClosePopover();
  };

  // Eliminar un vehículo
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/vehiculo/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar vehículo');
        setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id)); // Actualizar la lista localmente
      })
      .catch((error) => console.error('Error al eliminar:', error));
  };

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <div className="main-content">
        <h2>Vehículos</h2>
        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Vehículo
          </button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Capacidad</th>
              <th>Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id}>
                <td>{vehiculo.id}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.capacidad}</td>
                <td>{vehiculo.proveedorId}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleOpenPopover(vehiculo, true)}>
                    Editar
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(vehiculo.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPopoverOpen && (
        <div className="popover">
          <div className="popover-content">
            <h3 className="popover-title">{isEditing ? 'Editar Vehículo' : 'Crear Vehículo'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="marca">Marca</label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  className="form-input"
                  value={formData.marca}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  className="form-input"
                  value={formData.modelo}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="placa">Placa</label>
                <input
                  type="text"
                  id="placa"
                  name="placa"
                  className="form-input"
                  value={formData.placa}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="capacidad">Capacidad</label>
                <input
                  type="number"
                  id="capacidad"
                  name="capacidad"
                  className="form-input"
                  value={formData.capacidad}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="proveedorId">Proveedor ID</label>
                <input
                  type="text"
                  id="proveedorId"
                  name="proveedorId"
                  className="form-input"
                  value={formData.proveedorId}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {isEditing ? 'Guardar Cambios' : 'Crear'}
                </button>
                <button type="button" className="cancel-btn" onClick={handleClosePopover}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleCRUD;
