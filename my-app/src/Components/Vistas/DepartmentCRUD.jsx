import React, { useState } from 'react';
import './sidebar.css'; // Estilos 
import Sidebar from '../sidebar';
import Header from '../header';


function DepartamentCRUD() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Controla la visibilidad del formulario
  const [formData, setFormData] = useState({ id: '', nombre: '', ubicacion: '' }); // Datos del formulario
  const [isEditing, setIsEditing] = useState(false); // Define si es edición o creación

  const handleOpenPopover = (data = { id: '', nombre: '', ubicacion: '' }, editing = false) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({ id: '', nombre: '', ubicacion: '' });
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log('Editando departamento:', formData);
    } else {
      console.log('Creando departamento:', formData);
    }
    handleClosePopover();
  };

  return (
    <div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <Header /> {/* Usando el componente Sidebar */}
      <div className="main-content">
        
        <h2>Departamento</h2>

        {/* Botón Agregar Departamento */}
        <div className="add-user-btn-container">
          <button
            className="add-user-btn"
            onClick={() => handleOpenPopover()}
          >
            Agregar Departamento
          </button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Gerencia</td>
              <td>Oficina Central</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleOpenPopover({ id: '1', nombre: 'Gerencia', ubicacion: 'Oficina Central' }, true)}
                >
                  Editar
                </button>
                <button className="delete-btn">Eliminar</button>
              </td>
            </tr>
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
                <label htmlFor="ubicacion">Ubicación</label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  className="form-input"
                  value={formData.ubicacion}
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
