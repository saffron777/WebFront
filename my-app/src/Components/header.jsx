import React, { useState } from 'react';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Avatar, Badge } from 'antd';

function Header() {
  const [notificationCount, setNotificationCount] = useState(3);

  // URL de Keycloak para cambiar la contraseña
  const keycloakUrl = 'http://localhost:8080/realms/GruasUcab/account'; // URL actualizada con tu configuración

  // Función que maneja la redirección a la interfaz de Keycloak
  const handleChangePassword = () => {
    window.location.href = keycloakUrl; // Redirige a Keycloak para cambiar la contraseña
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        {/* Llamada a la función para cambiar la contraseña */}
        <a onClick={handleChangePassword}>Cambiar Contraseña</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/logout">Cerrar Sesión</a>
      </Menu.Item>
    </Menu>
  );

  const handleNotificationClick = () => {
    // Lógica para manejar las notificaciones (si la tienes)
    console.log('Ver notificaciones');
  };

  return (
    <div className="header">
      <div className="notification-icon" onClick={handleNotificationClick}>
        <Badge count={notificationCount} overflowCount={10}>
          <BellOutlined style={{ fontSize: '24px', color: '#fff', cursor: 'pointer' }} />
        </Badge>
      </div>
      <div className="avatar-container">
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', backgroundColor: '#1890ff' }} />
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
