// RolesContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const RolesContext = createContext();

export const useRoles = () => useContext(RolesContext);

export const RolesProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Aquí debes agregar la lógica para obtener los roles del usuario desde Keycloak
    // Esto puede ser el código que tienes en App.js para obtener los roles
    const userRoles = JSON.parse(localStorage.getItem('userRoles')) || [];
    setRoles(userRoles); // Cambia esto a tu lógica de Keycloak
  }, []);

  return (
    <RolesContext.Provider value={{ roles, setRoles }}>
      {children}
    </RolesContext.Provider>
  );
};
