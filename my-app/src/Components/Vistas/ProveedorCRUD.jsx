import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // React Hot Toast
import './sidebar.css';
import Sidebar from '../sidebar';
import Header from '../header';

function CRUDProveedor() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    activo: true,
    tipo: 'Interno', // Valor por defecto
  });
  const [isEditing, setIsEditing] = useState(false);
  const [proveedores, setProveedores] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Cargar proveedores al iniciar
  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = () => {
    fetch(`${API_BASE_URL}/proveedor`)
      .then((response) => response.json())
      .then((data) => setProveedores(data))
      .catch((error) => {
        console.error('Error al cargar proveedores:', error);
        toast.error('Error al cargar proveedores');
      });
  };

  const handleOpenPopover = (
    data = { id: '', nombre: '', direccion: '', telefono: '', email: '', activo: true, tipo: 'Interno' },
    editing = false
  ) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({ id: '', nombre: '', direccion: '', telefono: '', email: '', activo: true, tipo: 'Interno' });
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${API_BASE_URL}/proveedor/${formData.id}`
      : `${API_BASE_URL}/proveedor`;

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
        fetchProveedores();
        toast.success(
          isEditing
            ? 'Proveedor editado exitosamente'
            : 'Proveedor creado exitosamente'
        );
      })
      .catch((error) => {
        console.error('Error en la operación:', error);
        toast.error('Ocurrió un error al procesar la solicitud');
      });

    handleClosePopover();
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/proveedor/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar proveedor');
        setProveedores(proveedores.filter((prov) => prov.id !== id));
        toast.success('Proveedor eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar:', error);
        toast.error('Ocurrió un error al eliminar el proveedor');
      });
  };

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <Toaster position="top-right" reverseOrder={false} /> {/* Toaster para notificaciones */}
      <div className="main-content">
        <h2>Proveedores</h2>
        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Proveedor
          </button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Activo</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.email}</td>
                <td>{proveedor.activo ? 'Sí' : 'No'}</td>
                <td>{proveedor.tipo}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleOpenPopover(proveedor, true)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(proveedor.id)}
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
            <h3 className="popover-title">{isEditing ? 'Editar Proveedor' : 'Crear Proveedor'}</h3>
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
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  className="form-input"
                  value={formData.direccion}
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="activo">Activo</label>
                <input
                  type="checkbox"
                  id="activo"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo</label>
                <select
                  id="tipo"
                  name="tipo"
                  className="form-select"
                  value={formData.tipo}
                  onChange={handleFormChange}
                  required
                >
                  <option value="Interno">Interno</option>
                  <option value="Externo">Externo</option>
                </select>
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

export default CRUDProveedor;
