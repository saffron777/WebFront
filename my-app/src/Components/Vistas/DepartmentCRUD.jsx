import React, { useState, useEffect } from 'react';
import './sidebar.css'; // Estilos
import Sidebar from '../sidebar';
import Header from '../header';

function DepartamentCRUD() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Controla la visibilidad del formulario
  const [formData, setFormData] = useState({ id: '', nombre: '', ubicacion: '' }); // Datos del formulario
  const [isEditing, setIsEditing] = useState(false); // Define si es edición o creación
  const [departamentos, setDepartamentos] = useState([]); // Lista de departamentos

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch inicial para cargar los departamentos desde el backend
  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = () => {
    fetch(`${API_BASE_URL}/departamento`)
      .then((response) => response.json())
      .then((data) => setDepartamentos(data))
      .catch((error) => console.error('Error al cargar departamentos:', error));
  };

  const handleOpenPopover = (data = { id: '', nombre: '', descripcion: '' }, editing = false) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({ id: '', nombre: '', descripcion: '' });
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
      ? `${API_BASE_URL}/departamento/${formData.id}`
      : `${API_BASE_URL}/departamento`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar datos');
        return response.json();
      })
      .then(() => fetchDepartamentos()) // Actualizar lista de departamentos
      .catch((error) => console.error('Error en la operación:', error));

    handleClosePopover();
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/departamento/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar departamento');
        setDepartamentos(departamentos.filter((dep) => dep.id !== id)); // Actualizar la lista localmente
      })
      .catch((error) => console.error('Error al eliminar:', error));
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <Header /> {/* Usando el componente Header */}
      <div className="main-content">
        <h2>Departamentos</h2>

        {/* Botón Agregar Departamento */}
        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Departamento
          </button>
        </div>

        {/* Tabla dinámica de departamentos */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departamentos.map((departamento) => (
              <tr key={departamento.id}>
                <td>{departamento.id}</td>
                <td>{departamento.nombre}</td>
                <td>{departamento.descripcion}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleOpenPopover(departamento, true)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(departamento.id)}
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
            <h3 className="popover-title">{isEditing ? 'Editar Departamento' : 'Crear Departamento'}</h3>
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
                <label htmlFor="ubicacion">Descripcion</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  className="form-input"
                  value={formData.descripcion}
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

export default DepartamentCRUD;
