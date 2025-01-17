import Keycloak from "keycloak-js";

// Configuración de Keycloak
const keycloakConfig = {
  url: "https://gruasucab-u31026.vm.elestio.app/", // URL de tu servidor Keycloak
  realm: "GruasUcab",        // Nombre de tu realm en Keycloak
  clientId: "frontweb",   // ID del cliente registrado en Keycloak
};

// Crear instancia de Keycloak
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
