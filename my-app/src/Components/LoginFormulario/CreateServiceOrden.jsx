import React from 'react';
import './sidebar.css'; // Estilos
import loginImage from '../Assets/icon-image.png';
import createOrdenServicio from '../../services/apiService'; // Importa la función de la API
// Importa íconos desde una librería como react-icons o material-icons
import { FaUser, FaBuilding, FaCar, FaClipboardList, FaTruck, FaBell } from 'react-icons/fa';

function CreateOrder() {
  const [formData, setFormData] = useState({
    // Define los campos de tu formulario aquí
    beneficiary: '',
    origin: '',
    destination: '',
    // Agrega más campos según sea necesario
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOrdenServicio(formData);
      console.log('Orden de servicio creada:', response);
      alert('Orden de servicio creada con éxito');
      // Maneja la respuesta según sea necesario
    } catch (error) {
      console.error('Error al crear la orden de servicio:', error);
      alert('Error al crear la orden de servicio:'+ error);
      // Maneja el error según sea necesario
    }
  };
        return (
          <div className="container">
            <div className="sidebar">
              <div className="logo">
                <img src={loginImage} alt="Logo" className="sidebar-logo" />
              </div>
        <ul className="nav-items">
          <li>
            <a href="#">
              <FaUser className="nav-icon" /> Usuarios
            </a>
          </li>
          <li>
            <a href="#">
              <FaBuilding className="nav-icon" /> Departamentos
            </a>
          </li>
          <li>
            <a href="#">
              <FaCar className="nav-icon" /> Vehículos
            </a>
          </li>
          <li>
            <a href="#">
              <FaClipboardList className="nav-icon" /> Órdenes
            </a>
          </li>
          <li>
            <a href="#">
              <FaTruck className="nav-icon" /> Proveedores
            </a>
          </li>
          <li>
            <a href="#">
              <FaBell className="nav-icon" /> Notificaciones
            </a>
          </li>
        </ul>
        <button className="logout-button">Cerrar Sesión</button>
      </div>

      <div className="main-content">
        <h2>Crear Orden de Servicio</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="beneficiary">Beneficiario</label>
              <input type="text" id="beneficiary" name="beneficiary" value={formData.beneficiary}
          onChange={handleChange} placeholder="Nombre del beneficiario" required />
            </div>
            <div className="form-group">
              <label htmlFor="origin">Dirección de Origen</label>
              <input type="text" id="origin" name="origin" value={formData.origin}
          onChange={handleChange} placeholder="Dirección de origen" required />
            </div>
            <div className="form-group">
              <label htmlFor="destination">Dirección de Destino</label>
              <input type="text" id="destination" name="destination" value={formData.destination}
          onChange={handleChange} placeholder="Dirección de destino" required />
            </div>
            <button type="submit" className="submit-btn">Crear Orden</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
