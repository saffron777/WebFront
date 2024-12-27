import React, { useState } from 'react';

function UserForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rol: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llama a la función pasada por props
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Agregar Usuario</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Correo:</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Rol:</label>
        <select name="rol" value={formData.rol} onChange={handleChange} required>
          <option value="">Seleccione</option>
          <option value="Admin">Admin</option>
          <option value="Usuario">Usuario</option>
          <option value="Proveedor">Proveedor</option>
        </select>
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default UserForm;
