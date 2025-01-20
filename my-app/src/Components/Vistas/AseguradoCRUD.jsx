import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './sidebar.css'; // Estilos
import Sidebar from '../sidebar';
import Header from '../header';

function AseguradoCRUD() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    documentoIdentidad: '',
    telefono: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [asegurados, setAsegurados] = useState([]);
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
    data = { id: '', nombre: '', apellido: '', documentoIdentidad: '', telefono: '' },
    editing = false
  ) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({ id: '', nombre: '', apellido: '', documentoIdentidad: '', telefono: '' });
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      id: formData.id,
      nombre: formData.nombre,
      apellido: formData.apellido,
      documentoIdentidad: formData.documentoIdentidad,
      telefono: formData.telefono,
    };

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${API_BASE_URL}/asegurado/${formData.id}`
      : `${API_BASE_URL}/asegurado`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Error al enviar datos');
        if (response.status !== 204) {
          return await response.json();
        }
        return null;
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
      .then(async (response) => {
        if (!response.ok) throw new Error('Error al eliminar asegurado');
        if (response.status !== 204) {
          return await response.json();
        }
        return null;
      })
      .then(() => {
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
      <Sidebar />
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="main-content">
        <h2>Asegurados</h2>

        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Asegurado
          </button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento de Identidad</th>
              <th>Teléfono</th>
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
              {isEditing && (
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    className="form-input"
                    value={formData.id}
                    readOnly
                  />
                </div>
              )}
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
