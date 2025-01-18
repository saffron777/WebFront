import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Pagination } from 'antd'; // Importar Pagination de Ant Design
import './sidebar.css';
import Sidebar from '../sidebar';
import Header from '../header';

function PolizaCRUD() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    tipoCobertura: '',
    kilometrosIncluidos: '',
    costoXKilometro: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [polizas, setPolizas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [pageSize] = useState(8); // Número de elementos por página

  const API_BASE_URL = 'http://localhost:5132'; // URL base corregida

  useEffect(() => {
    fetchPolizas();
  }, []);

  const fetchPolizas = () => {
    fetch(`${API_BASE_URL}/polizas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setPolizas(data))
      .catch((error) => {
        console.error('Detalles del error al cargar pólizas:', error);
        toast.error('No se pudieron cargar las pólizas. Verifica tu conexión o contacta al administrador.');
      });
  };

  const handleOpenPopover = (
    data = { id: '', nombre: '', tipoCobertura: '', kilometrosIncluidos: '', costoXKilometro: '' },
    editing = false
  ) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({ id: '', nombre: '', tipoCobertura: '', kilometrosIncluidos: '', costoXKilometro: '' });
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = `${API_BASE_URL}/polizas${isEditing ? `/${formData.id}` : ''}`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar los datos');
        if (response.status !== 204) return response.json();
      })
      .then(() => {
        fetchPolizas();
        toast.success(isEditing ? 'Póliza editada exitosamente' : 'Póliza creada exitosamente');
      })
      .catch((error) => {
        console.error('Error en la operación:', error);
        toast.error('Ocurrió un error al procesar la solicitud.');
      });

    handleClosePopover();
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/polizas/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar la póliza');
        setPolizas(polizas.filter((poliza) => poliza.id !== id));
        toast.success('Póliza eliminada exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar:', error);
        toast.error('Ocurrió un error al eliminar la póliza.');
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Cambia la página actual
  };

  // Calcular los datos de la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = polizas.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="main-content">
        <h2>Pólizas</h2>

        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Póliza
          </button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo de Cobertura</th>
              <th>Kilómetros Incluidos</th>
              <th>Costo por Kilómetro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((poliza) => (
              <tr key={poliza.id}>
                <td>{poliza.id}</td>
                <td>{poliza.nombre}</td>
                <td>{poliza.tipoCobertura}</td>
                <td>{poliza.kilometrosIncluidos}</td>
                <td>{poliza.costoXKilometro}</td>
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

        {/* Componente de paginación */}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={polizas.length}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      </div>

      {isPopoverOpen && (
        <div className="popover">
          <div className="popover-content">
            <h3 className="popover-title">{isEditing ? 'Editar Póliza' : 'Crear Póliza'}</h3>
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
  <label htmlFor="tipoCobertura">Tipo de Cobertura</label>
  <select
    id="tipoCobertura"
    name="tipoCobertura"
    className="form-input"
    value={formData.tipoCobertura}
    onChange={handleFormChange}
    required
  >
    <option value="" disabled>Selecciona una opción</option>
    <option value="Carro">Carro</option>
    <option value="Moto">Moto</option>
    <option value="Camioneta">Camioneta</option>
  </select>
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

              <div className="form-group">
                <label htmlFor="costoXKilometro">Costo por Kilómetro</label>
                <input
                  type="number"
                  id="costoXKilometro"
                  name="costoXKilometro"
                  className="form-input"
                  value={formData.costoXKilometro}
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
