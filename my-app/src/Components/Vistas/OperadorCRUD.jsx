import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd'; // Importar Pagination de Ant Design
import './sidebar.css';
import Sidebar from '../sidebar';
import Header from '../header';

function OperadorCRUD() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditPopoverOpen, setIsEditPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    departamentoId: '',
    activo: true,
    password: '',
    email: '',
    username: ''
  });
  const [editFormData, setEditFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    departamentoId: '',
    activo: true
  });
  const [usuarios, setUsuarios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]); // Almacenará los departamentos
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [pageSize] = useState(8); // Número de elementos por página

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchUsuarios();
    fetchDepartamentos(); // Cargar los departamentos al iniciar
  }, []);

  const fetchUsuarios = () => {
    fetch(`${API_BASE_URL}/Usuario`)
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch(() => console.error('Error al cargar los usuarios'));
  };

  const fetchDepartamentos = () => {
    fetch(`${API_BASE_URL}/Departamento`)
      .then((response) => response.json())
      .then((data) => setDepartamentos(data))
      .catch(() => console.error('Error al cargar los departamentos'));
  };

  const handleOpenPopover = () => {
    setFormData({
      id: '',
      nombre: '',
      apellido: '',
      departamentoId: '',
      activo: true,
      password: '',
      email: '',
      username: ''
    });
    setIsPopoverOpen(true);
  };

  const handleOpenEditPopover = (data) => {
    setEditFormData(data);
    setIsEditPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleCloseEditPopover = () => {
    setIsEditPopoverOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de datos antes de enviar
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.username || !formData.password || !formData.departamentoId) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    const url = `${API_BASE_URL}/Usuario`;

    const usuarioDto = {
      usuarioDto: {
        nombre: formData.nombre,
        apellido: formData.apellido,
        departamentoId: formData.departamentoId,
        activo: formData.activo,
        password: formData.password,
        email: formData.email,
        username: formData.username,
      }
    };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioDto), // Enviar el objeto correctamente estructurado
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar los datos');
        if (response.status !== 204) return response.json(); // Solo cuando no es un '204 No Content'
      })
      .then(() => {
        fetchUsuarios(); // Refrescar los usuarios
      })
      .catch((error) => {
        console.error('Ocurrió un error al procesar la solicitud', error);
      })
      .finally(() => {
        handleClosePopover(); // Cerrar el popover después de enviar
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Validación de datos antes de enviar
    if (!editFormData.nombre || !editFormData.apellido || !editFormData.departamentoId) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    const url = `${API_BASE_URL}/Usuario`;

    const usuarioDto = {
      id: editFormData.id,
      nombre: editFormData.nombre,
      apellido: editFormData.apellido,
      departamentoId: editFormData.departamentoId,
      activo: editFormData.activo,
    };

    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioDto), // Enviar el objeto correctamente estructurado
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Error al enviar los datos: ${response.status}`);
        if (response.status !== 204) return response.json(); // Solo cuando no es un '204 No Content'
      })
      .then(() => {
        fetchUsuarios(); // Refrescar los usuarios
      })
      .catch((error) => {
        console.error('Ocurrió un error al procesar la solicitud', error);
      })
      .finally(() => {
        handleCloseEditPopover(); // Cerrar el popover después de enviar
      });
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/Usuario/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar operador');
        setUsuarios(usuarios.filter((user) => user.id !== id));
      })
      .catch(() => {
        console.error('Ocurrió un error al eliminar el operador');
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Cambia la página actual
  };

  // Calcular los datos de la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = usuarios.slice(startIndex, startIndex + pageSize);

  // Obtener el nombre del departamento por su ID
  const getDepartamentoNombre = (departamentoId) => {
    const departamento = departamentos.find((dep) => dep.id === departamentoId);
    return departamento ? departamento.nombre : 'N/A';
  };

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <div className="main-content">
        <h2>Operadores</h2>

        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={handleOpenPopover}>
            Agregar Operador
          </button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Departamento</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{getDepartamentoNombre(usuario.departamentoId)}</td>
                <td>{usuario.activo ? 'Sí' : 'No'}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleOpenEditPopover(usuario)}>
                    Editar
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(usuario.id)}>
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
          total={usuarios.length}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      </div>

      {isPopoverOpen && (
        <div className="popover">
          <div className="popover-content">
            <h3 className="popover-title">Crear Operador</h3>
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
                <label htmlFor="departamentoId">Departamento</label>
                <select
                  id="departamentoId"
                  name="departamentoId"
                  value={formData.departamentoId}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Seleccionar departamento</option>
                  {departamentos.map((dep) => (
                    <option key={dep.id} value={dep.id}>
                      {dep.nombre}
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
                  Crear
                </button>
                <button type="button" className="cancel-btn" onClick={handleClosePopover}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditPopoverOpen && (
        <div className="popover">
          <div className="popover-content">
            <h3 className="popover-title">Editar Operador</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input type="text" id="id" name="id" className="form-input" value={editFormData.id} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-input"
                  value={editFormData.nombre}
                  onChange={handleEditFormChange}
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
                  value={editFormData.apellido}
                  onChange={handleEditFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="departamentoId">Departamento</label>
                <select
                  id="departamentoId"
                  name="departamentoId"
                  value={editFormData.departamentoId}
                  onChange={handleEditFormChange}
                  required
                >
                  <option value="">Seleccionar departamento</option>
                  {departamentos.map((dep) => (
                    <option key={dep.id} value={dep.id}>
                      {dep.nombre}
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
                  checked={editFormData.activo}
                  onChange={(e) => setEditFormData({ ...editFormData, activo: e.target.checked })}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Guardar Cambios
                </button>
                <button type="button" className="cancel-btn" onClick={handleCloseEditPopover}>
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

export default OperadorCRUD;