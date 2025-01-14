import React, { useState, useEffect } from 'react';
import './sidebar.css'; // Estilos
import Sidebar from '../sidebar';
import Header from '../header';

function PolizaCRUD() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', tipoCobertura: '', kilometrosIncluidos: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [polizas, setPolizas] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch inicial para cargar las pólizas desde el backend
  useEffect(() => {
    fetchPolizas();
  }, []);

  const fetchPolizas = () => {
    fetch(`${API_BASE_URL}/polizas`)
      .then((response) => response.json())
      .then((data) => setPolizas(data))
      .catch((error) => console.error('Error al cargar pólizas:', error));
  };

  const handleOpenPopover = (data = { id: '', tipoCobertura: '', kilometrosIncluidos: '' }, editing = false) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({ id: '', tipoCobertura: '', kilometrosIncluidos: '' });
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${API_BASE_URL}/polizas/${formData.id}`
      : `${API_BASE_URL}/polizas`;

    const payload = {
      tipoCobertura: formData.tipoCobertura,
      kilometrosIncluidos: parseInt(formData.kilometrosIncluidos, 10),
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar datos');
        return response.json();
      })
      .then(() => fetchPolizas()) // Actualizar lista de pólizas
      .catch((error) => console.error('Error en la operación:', error));

    handleClosePopover();
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/polizas/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar póliza');
        setPolizas(polizas.filter((poliza) => poliza.id !== id)); // Actualizar la lista localmente
      })
      .catch((error) => console.error('Error al eliminar:', error));
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <Header /> {/* Usando el componente Header */}
      <div className="main-content">
        <h2>Pólizas</h2>

        {/* Botón Agregar Póliza */}
        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Póliza
          </button>
        </div>

        {/* Tabla dinámica de pólizas */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo de Cobertura</th>
              <th>Kilómetros Incluidos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {polizas.map((poliza) => (
              <tr key={poliza.id}>
                <td>{poliza.id}</td>
                <td>{poliza.tipoCobertura}</td>
                <td>{poliza.kilometrosIncluidos}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleOpenPopover(poliza, true)}>
                    Editar
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(poliza.id)}>
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
            <h3 className="popover-title">{isEditing ? 'Editar Póliza' : 'Crear Póliza'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="tipoCobertura">Tipo de Cobertura</label>
                <input
                  type="text"
                  id="tipoCobertura"
                  name="tipoCobertura"
                  className="form-input"
                  value={formData.tipoCobertura}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="kilometrosIncluidos">Kilómetros Incluidos</label>
                <input
                  type="number"
                  id="kilometrosIncluidos"
                  name="kilometrosIncluidos"
                  className="form-input"
                  value={formData.kilometrosIncluidos}
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

export default PolizaCRUD;

