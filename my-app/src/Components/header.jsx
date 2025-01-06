import React, { useState } from 'react';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Avatar, Badge } from 'antd';

function Header() {
  const [notificationCount, setNotificationCount] = useState(3);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a href="/change-password">Cambiar Contraseña</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/logout">Cerrar Sesión</a>
      </Menu.Item>
    </Menu>
  );

  const handleNotificationClick = () => {
    // Aquí puedes manejar la lógica de notificaciones
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
