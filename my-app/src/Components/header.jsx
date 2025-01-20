// Header.jsx
import React, { useState } from 'react';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Avatar, Badge } from 'antd';

function Header({ keycloak }) {  // Recibe keycloak como prop
  const [notificationCount, setNotificationCount] = useState(3);

  // URL actualizada para cambiar la contraseña en Keycloak
  const keycloakUrl = 'https://gruasucab-u31026.vm.elestio.app/realms/GruasUcab/account'; 

  // Función para cambiar la contraseña
  const handleChangePassword = () => {
    window.location.href = keycloakUrl;
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    if (keycloak && keycloak.logout) {
      const redirectUri = `${window.location.origin}`; // Redirigir a la ruta actual
      keycloak.logout({ redirectUri });
    } else {
      console.error('Keycloak no está definido correctamente.');
    }
  };

  // Menú con las opciones de cambiar contraseña y cerrar sesión
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={handleChangePassword}>Cambiar Contraseña</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={handleLogout}>Cerrar Sesión</a>
      </Menu.Item>
    </Menu>
  );

  // Función para manejar las notificaciones
  const handleNotificationClick = () => {
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
