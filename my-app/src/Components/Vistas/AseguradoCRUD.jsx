import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './sidebar.css'; // Estilos
import Sidebar from '../sidebar';
import Header from '../header';

function AseguradoCRUD() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Controla la visibilidad del formulario
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    documentoIdentidad: '',
    telefono: '',
    polizaId: '',
  }); // Datos del formulario
  const [isEditing, setIsEditing] = useState(false); // Define si es edición o creación
  const [asegurados, setAsegurados] = useState([]); // Lista de asegurados

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchAsegurados();
  }, []);

  const fetchAsegurados = () => {
    fetch(`${API_BASE_URL}/asegurado`)
      .then((response) => response.json())
      .then((data) => setAsegurados(data))
      .catch((error) => console.error('Error al cargar asegurados:', error));
  };

  const handleOpenPopover = (
    data = { id: '', nombre: '', apellido: '', documentoIdentidad: '', telefono: '', polizaId: '' },
    editing = false
  ) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({ id: '', nombre: '', apellido: '', documentoIdentidad: '', telefono: '', polizaId: '' });
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
      ? `${API_BASE_URL}/asegurado/${formData.id}`
      : `${API_BASE_URL}/asegurado`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar datos');
        return response.json();
      })
      .then(() => {
        fetchAsegurados();
        toast.success(
          isEditing
            ? 'Asegurado editado exitosamente'
            : 'Asegurado creado exitosamente'
        );
      })
      .catch((error) => {
        console.error('Error en la operación:', error);
        toast.error('Ocurrió un error al procesar la solicitud');
      });

    handleClosePopover();
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/asegurado/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar asegurado');
        setAsegurados(asegurados.filter((asegurado) => asegurado.id !== id));
        toast.success('Asegurado eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar:', error);
        toast.error('Ocurrió un error al eliminar el asegurado');
      });
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <Header /> {/* Usando el componente Header para Avatar y notificaciones */}
      <Toaster position="top-right" reverseOrder={false} /> {/* Componente Toaster */}
      <div className="main-content">
        <h2>Asegurados</h2>

        {/* Botón Agregar Asegurado */}
        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Asegurado
          </button>
        </div>

        {/* Tabla dinámica de asegurados */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento de Identidad</th>
              <th>Teléfono</th>
              <th>Póliza ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asegurados.map((asegurado) => (
              <tr key={asegurado.id}>
                <td>{asegurado.id}</td>
                <td>{asegurado.nombre}</td>
                <td>{asegurado.apellido}</td>
                <td>{asegurado.documentoIdentidad}</td>
                <td>{asegurado.telefono}</td>
                <td>{asegurado.polizaId}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleOpenPopover(asegurado, true)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(asegurado.id)}
                  >
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
            <h3 className="popover-title">{isEditing ? 'Editar Asegurado' : 'Crear Asegurado'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-input"
                  value={formData.nombre}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  className="form-input"
                  value={formData.apellido}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="documentoIdentidad">Documento de Identidad</label>
                <input
                  type="text"
                  id="documentoIdentidad"
                  name="documentoIdentidad"
                  className="form-input"
                  value={formData.documentoIdentidad}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  className="form-input"
                  value={formData.telefono}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="polizaId">Póliza ID</label>
                <input
                  type="text"
                  id="polizaId"
                  name="polizaId"
                  className="form-input"
                  value={formData.polizaId}
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

export default AseguradoCRUD;
