import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // React Hot Toast
import './sidebar.css';
import Sidebar from '../sidebar';
import Header from '../header';

function CRUDUsuarioProveedor() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
    activo: true,
    proveeId: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [usuarios, setUsuarios] = useState([]); // Inicializado como un array vacío

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Cargar usuarios al iniciar
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    fetch(`${API_BASE_URL}/Usuario/Proveedor`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar usuarios');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsuarios(data); // Asegurarse de que sea un array
        } else {
          console.error('La respuesta no es un array:', data);
          toast.error('Error en el formato de la respuesta');
        }
      })
      .catch((error) => {
        console.error('Error al cargar usuarios:', error);
        toast.error('Error al cargar usuarios');
      });
  };

  const handleOpenPopover = (
    data = { id: '', nombre: '', apellido: '', email: '', username: '', password: '', activo: true, proveeId: '' },
    editing = false
  ) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({ id: '', nombre: '', apellido: '', email: '', username: '', password: '', activo: true, proveeId: '' });
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
      ? `${API_BASE_URL}/Usuario/Proveedor/${formData.id}`
      : `${API_BASE_URL}/Usuario/Proveedor`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuarioDto: formData,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar datos');
        return response.json();
      })
      .then(() => {
        fetchUsuarios(); // Actualizar la lista
      })
      .catch((error) => {
        console.error('Error en la operación:', error);
        toast.error('Ocurrió un error al procesar la solicitud');
      });

    handleClosePopover();
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/Usuario/Proveedor/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar usuario');
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar:', error);
        toast.error('Ocurrió un error al eliminar el usuario');
      });
  };

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="main-content">
        <h2>Usuarios Proveedores</h2>
        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Usuario
          </button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Username</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) && usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.username}</td>
                  <td>{usuario.activo ? 'Sí' : 'No'}</td>
                  <td>
                    <button onClick={() => handleOpenPopover(usuario, true)}>Editar</button>
                    <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No hay usuarios disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isPopoverOpen && (
        <div className="popover">
          <div className="popover-content">
            <h3 className="popover-title">{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h3>
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
                <label htmlFor="proveeId">Proveedor ID</label>
                <input
                  type="text"
                  id="proveeId"
                  name="proveeId"
                  className="form-input"
                  value={formData.proveeId}
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

export default CRUDUsuarioProveedor;
