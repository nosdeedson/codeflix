import Keycloak from "keycloak-js";

const keycloakConfig = {
    url: "http://localhost:8080",
    realm: 'codeflix',
    clientId: 'codeFlix',
}

export const keycloak = new Keycloak(keycloakConfig);

