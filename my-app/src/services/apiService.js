// filepath: /d:/Proyectos/Gruas/WebFront/my-app/src/apiService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

// Asegurado Services
export const getAseguradoById = (id) => handleRequest(() => api.get(`/api/Asegurado/${id}`));
export const updateAsegurado = (id, data) => handleRequest(() => api.put(`/api/Asegurado/${id}`, data));
export const deleteAsegurado = (id) => handleRequest(() => api.delete(`/api/Asegurado/${id}`));
export const getAllAsegurados = () => handleRequest(() => api.get('/api/Asegurado'));
export const createAsegurado = (data) => handleRequest(() => api.post('/api/Asegurado', data));

// Conductor Services
export const getConductorById = (id) => handleRequest(() => api.get(`/api/Conductor/${id}`));
export const updateConductor = (id, data) => handleRequest(() => api.put(`/api/Conductor/${id}`, data));
export const deleteConductor = (id) => handleRequest(() => api.delete(`/api/Conductor/${id}`));
export const getAllConductores = () => handleRequest(() => api.get('/api/Conductor'));
export const createConductor = (data) => handleRequest(() => api.post('/api/Conductor', data));

// CostoAdicional Services
export const getCostoAdicionalById = (id) => handleRequest(() => api.get(`/api/CostoAdicional/${id}`));
export const updateCostoAdicional = (id, data) => handleRequest(() => api.put(`/api/CostoAdicional/${id}`, data));
export const deleteCostoAdicional = (id) => handleRequest(() => api.delete(`/api/CostoAdicional/${id}`));
export const getAllCostosAdicionales = () => handleRequest(() => api.get('/api/CostoAdicional'));
export const createCostoAdicional = (data) => handleRequest(() => api.post('/api/CostoAdicional', data));

// OrdenServicio Services
export const getOrdenServicioById = (id) => handleRequest(() => api.get(`/api/OrdenServicio/${id}`));
export const updateOrdenServicio = (id, data) => handleRequest(() => api.put(`/api/OrdenServicio/${id}`, data));
export const deleteOrdenServicio = (id) => handleRequest(() => api.delete(`/api/OrdenServicio/${id}`));
export const getAllOrdenesServicio = () => handleRequest(() => api.get('/api/OrdenServicio'));
export const createOrdenServicio = (data) => handleRequest(() => api.post('/api/OrdenServicio', data));

// Poliza Services
export const getPolizaById = (id) => handleRequest(() => api.get(`/api/Poliza/${id}`));
export const updatePoliza = (id, data) => handleRequest(() => api.put(`/api/Poliza/${id}`, data));
export const deletePoliza = (id) => handleRequest(() => api.delete(`/api/Poliza/${id}`));
export const getAllPolizas = () => handleRequest(() => api.get('/api/Poliza'));
export const createPoliza = (data) => handleRequest(() => api.post('/api/Poliza', data));

// Proveedor Services
export const getProveedorById = (id) => handleRequest(() => api.get(`/api/Proveedor/${id}`));
export const updateProveedor = (id, data) => handleRequest(() => api.put(`/api/Proveedor/${id}`, data));
export const deleteProveedor = (id) => handleRequest(() => api.delete(`/api/Proveedor/${id}`));
export const getAllProveedores = () => handleRequest(() => api.get('/api/Proveedor'));
export const createProveedor = (data) => handleRequest(() => api.post('/api/Proveedor', data));

// Usuario Services
export const getUsuarioById = (id) => handleRequest(() => api.get(`/api/Usuario/${id}`));
export const updateUsuario = (id, data) => handleRequest(() => api.put(`/api/Usuario/${id}`, data));
export const deleteUsuario = (id) => handleRequest(() => api.delete(`/api/Usuario/${id}`));
export const getAllUsuarios = () => handleRequest(() => api.get('/api/Usuario'));
export const createUsuario = (data) => handleRequest(() => api.post('/api/Usuario', data));

// Vehiculo Services
export const getVehiculoById = (id) => handleRequest(() => api.get(`/api/Vehiculo/${id}`));
export const updateVehiculo = (id, data) => handleRequest(() => api.put(`/api/Vehiculo/${id}`, data));
export const deleteVehiculo = (id) => handleRequest(() => api.delete(`/api/Vehiculo/${id}`));
export const getAllVehiculos = () => handleRequest(() => api.get('/api/Vehiculo'));
export const createVehiculo = (data) => handleRequest(() => api.post('/api/Vehiculo', data));