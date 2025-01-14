import Keycloak from "keycloak-js";

// Configuración de Keycloak
const keycloakConfig = {
  url: "http://localhost:8080", // URL de tu servidor Keycloak
  realm: "GruasUcab",        // Nombre de tu realm en Keycloak
  clientId: "gruasucab",   // ID del cliente registrado en Keycloak
};

// Crear instancia de Keycloak
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
