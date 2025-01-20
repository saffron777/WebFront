import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Pagination } from 'antd';
import './sidebar.css';
import Sidebar from '../sidebar';
import Header from '../header';

function VehiculoCRUD() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    placa: '',
    marca: '',
    modelo: '',
    tipo: '',
    aseguradoId: '',
    polizaId: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [asegurados, setAsegurados] = useState([]);
  const [polizas, setPolizas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchVehiculos();
    fetchAsegurados();
    fetchPolizas();
  }, []);

  const fetchVehiculos = () => {
    fetch(`${API_BASE_URL}/VehiculoAsegurado`)
      .then((response) => response.json())
      .then((data) => setVehiculos(data))
      .catch((error) => {
        console.error('Error al cargar vehículos:', error);
        toast.error('Error al cargar vehículos');
      });
  };

  const fetchAsegurados = () => {
    fetch(`${API_BASE_URL}/Asegurado`)
      .then((response) => response.json())
      .then((data) => setAsegurados(data))
      .catch((error) => {
        console.error('Error al cargar asegurados:', error);
        toast.error('Error al cargar asegurados');
      });
  };

  const fetchPolizas = () => {
    fetch(`${API_BASE_URL}/Poliza`)
      .then((response) => response.json())
      .then((data) => setPolizas(data))
      .catch((error) => {
        console.error('Error al cargar pólizas:', error);
        toast.error('Error al cargar pólizas');
      });
  };

  const handleOpenPopover = (
    data = {
      id: '',
      placa: '',
      marca: '',
      modelo: '',
      tipo: '',
      aseguradoId: '',
      polizaId: '',
    },
    editing = false
  ) => {
    setFormData(data);
    setIsEditing(editing);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setFormData({
      id: '',
      placa: '',
      marca: '',
      modelo: '',
      tipo: '',
      aseguradoId: '',
      polizaId: '',
    });
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isEditing
      ? `${API_BASE_URL}/VehiculoAsegurado/${formData.id}`
      : `${API_BASE_URL}/VehiculoAsegurado`;

    const method = isEditing ? 'PUT' : 'POST';

    const body = {
      placa: formData.placa,
      marca: formData.marca,
      modelo: formData.modelo,
      tipo: formData.tipo,
      aseguradoId: formData.aseguradoId,
      polizaId: formData.polizaId,
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al enviar los datos');
        fetchVehiculos();
        toast.success(
          isEditing
            ? 'Vehículo editado exitosamente'
            : 'Vehículo creado exitosamente'
        );
      })
      .catch((error) => {
        console.error('Error en la operación:', error);
        toast.error('Error al realizar la operación');
      });

    handleClosePopover();
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/VehiculoAsegurado/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar el vehículo');
        fetchVehiculos();
        toast.success('Vehículo eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar el vehículo:', error);
        toast.error('Error al eliminar el vehículo');
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = vehiculos.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container">
      <Sidebar />
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="main-content">
        <h2>Vehículos Asegurados</h2>
        <div className="add-user-btn-container">
          <button className="add-user-btn" onClick={() => handleOpenPopover()}>
            Agregar Vehículo
          </button>
        </div>
        <table className="crud-table">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Tipo</th>
              <th>Asegurado</th>
              <th>Póliza</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((vehiculo) => (
              <tr key={vehiculo.id}>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.tipo}</td>
                <td>{asegurados.find(a => a.id === vehiculo.aseguradoId)?.nombre}</td>
                <td>{polizas.find(p => p.id === vehiculo.polizaId)?.nombre}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleOpenPopover(vehiculo, true)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(vehiculo.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={vehiculos.length}
          onChange={handlePageChange}
        />
      </div>
      {isPopoverOpen && (
        <div className="popover">
          <div className="popover-content">
            <h3>{isEditing ? 'Editar Vehículo' : 'Crear Vehículo'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="placa">Placa</label>
                <input
                  id="placa"
                  name="placa"
                  className="form-input"
                  value={formData.placa}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="marca">Marca</label>
                <input
                  id="marca"
                  name="marca"
                  className="form-input"
                  value={formData.marca}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <input
                  id="modelo"
                  name="modelo"
                  className="form-input"
                  value={formData.modelo}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo</label>
                <input
                  id="tipo"
                  name="tipo"
                  className="form-input"
                  value={formData.tipo}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="aseguradoId">Asegurado</label>
                <select
                  id="aseguradoId"
                  name="aseguradoId"
                  className="form-input"
                  value={formData.aseguradoId}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Seleccione un Asegurado</option>
                  {asegurados.map((asegurado) => (
                    <option key={asegurado.id} value={asegurado.id}>
                      {asegurado.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="polizaId">Póliza</label>
                <select
                  id="polizaId"
                  name="polizaId"
                  className="form-input"
                  value={formData.polizaId}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Seleccione una Póliza</option>
                  {polizas.map((poliza) => (
                    <option key={poliza.id} value={poliza.id}>
                      {poliza.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-btn">
                {isEditing ? 'Guardar Cambios' : 'Crear'}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleClosePopover}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehiculoCRUD;
