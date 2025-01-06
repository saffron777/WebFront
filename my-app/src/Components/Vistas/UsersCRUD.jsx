import React from 'react';
import './sidebar.css'; // Estilos 
import Sidebar from '../sidebar';


function UsersCRUD() {
  return (
    
<div className="container">
      <Sidebar /> {/* Usando el componente Sidebar */}
      <div className=""></div>

      {/* Tabla CRUD */}
      <div className="main-content">
        <h2>Usuarios</h2>
        
        {/* Botón Agregar Usuario */}
        <div className="add-user-btn-container">
          <button className="add-user-btn">Agregar Usuario</button>
        </div>
        

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th> {/* Columna de Rol agregada */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Juan Pérez</td>
              <td>juan@example.com</td>
              <td>Administrador</td> {/* Ejemplo de rol */}
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Ana Gómez</td>
              <td>ana@example.com</td>
              <td>Usuario</td> {/* Ejemplo de rol */}
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Carlos López</td>
              <td>carlos@example.com</td>
              <td>Proveedor</td> {/* Ejemplo de rol */}
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>María García</td>
              <td>maria@example.com</td>
              <td>Usuario</td> {/* Ejemplo de rol */}
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersCRUD;