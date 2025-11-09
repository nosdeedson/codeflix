import Keycloak from "keycloak-js";

const keycloakConfig = {
    url: "http://localhost:8080/auth",
    realm: 'codeFlix',
    clientId: 'codeFlix',
}

export const keycloak = new Keycloak(keycloakConfig);

