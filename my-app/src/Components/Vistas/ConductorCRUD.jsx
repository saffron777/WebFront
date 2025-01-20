import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd'; // Importar Pagination de Ant Design
import './sidebar.css';
import Sidebar from '../sidebar';
import Header from '../header';

function ConductorCRUD() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    licencia: '',
    telefono: '',
    proveedorId: '',
    documentoIdentidad: '',
    activo: true,
    password: '',
    email: '',
    username: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [conductores, setConductores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [pageSize] = useState(8); // Número de elementos por página
  const [proveedores, setProveedores] = useState([]); // Almacenará los proveedores

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchConductores();
    fetchProveedores(); // Cargar los proveedores al iniciar
  }, []);

  const fetchConductores = () => {
    fetch(`${API_BASE_URL}/Conductor`)
      .then((response) => response.json())
      .then((data) => setConductores(data))
      .catch(() => console.error('Error al cargar los conductores'));
  };

  const fetchProveedores = () => {
    fetch(`${API_BASE_URL}/Proveedor`)
      .then((response) => response.json())
      .then((data) => setProveedores(data))
      .catch(() => console.error('Error al cargar los proveedores'));
  };

  const handleOpenPopover = (data = { id: '', nombre: '', apellido: '', licencia: '', telefono: '', proveedorId: '', documentoIdentidad: '', activo: true, password: '', email: '', username: '' }, editing = false) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({
      id: '',
      nombre: '',
      apellido: '',
      licencia: '',
      telefono: '',
      proveedorId: '',
      documentoIdentidad: '',
      activo: true,
      password: '',
      email: '',
      username: ''
    });
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de datos antes de enviar
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.username || !formData.password || !formData.licencia || !formData.proveedorId) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    const method = isEditing ? 'PUT' : 'POST';
    const url = `${API_BASE_URL}/Conductor`;

    const conductorDTO = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      licencia: formData.licencia,
      telefono: formData.telefono,
      proveedorId: formData.proveedorId,
      documentoIdentidad: formData.documentoIdentidad,
      activo: formData.activo,
      password: formData.password,
      email: formData.email,
      username: formData.username,
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conductorDTO }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar los datos');
        if (response.status !== 204) return response.json(); // Solo cuando no es un '204 No Content'
      })
      .then(() => {
        fetchConductores();
      })
      .catch(() => {
        console.error('Ocurrió un error al procesar la solicitud');
      })
      .finally(() => {
        handleClosePopover();
      });
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/Conductor/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar conductor');
        setConductores(conductores.filter((conductor) => conductor.id !== id));
      })
      .catch(() => {
        console.error('Ocurrió un error al eliminar el conductor');
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Cambia la página actual
  };

  // Calcular los datos de la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = conductores.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <div className="main-content">
        <h2>Conductores</h2>

        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Conductor
          </button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((conductor) => (
              <tr key={conductor.id}>
                <td>{conductor.id}</td>
                <td>{conductor.nombre}</td>
                <td>{conductor.apellido}</td>
                <td>{conductor.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleOpenPopover(conductor, true)}>
                    Editar
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(conductor.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Componente de paginación */}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={conductores.length}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      </div>

      {isPopoverOpen && (
        <div className="popover">
          <div className="popover-content">
            <h3 className="popover-title">{isEditing ? 'Editar Conductor' : 'Crear Conductor'}</h3>
            <form onSubmit={handleSubmit}>
              {isEditing && (
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input type="text" id="id" name="id" className="form-input" value={formData.id} readOnly />
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
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  value={formData.username}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="licencia">Licencia</label>
                <input
                  type="text"
                  id="licencia"
                  name="licencia"
                  className="form-input"
                  value={formData.licencia}
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
                <label htmlFor="proveedorId">Proveedor</label>
                <select
                  id="proveedorId"
                  name="proveedorId"
                  value={formData.proveedorId}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Seleccionar proveedor</option>
                  {proveedores.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="activo">Activo</label>
                <input
                  type="checkbox"
                  id="activo"
                  name="activo"
                  className="form-input"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
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

export default ConductorCRUD;
