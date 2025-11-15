import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { keycloak } from "../keycloakConfig";
import { setAuthenticated, setToken, setUserDetails } from "../features/auth/authSlice";

export const KeycloakProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  // I used this when the keycloak was not configured correctly
  // const [ready, setReady] = useState(false);

  useEffect(() => {
    const updateToken = (refresh = false) => {
      if (refresh) {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
            dispatch(setToken(keycloak.token));
          }
        });
      }
    };

    keycloak.onTokenExpired = () => updateToken(true);

    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: "login-required",
          checkLoginIframe: false,
          pkceMethod: "S256"
        });

        if (authenticated) {
          dispatch(setAuthenticated(true));
          dispatch(setToken(keycloak.token));

          const userInfo = await keycloak.loadUserInfo();
          dispatch(setUserDetails(userInfo));
        } else {
          dispatch(setAuthenticated(false));
        }
      } catch (error) {
        console.error(error);
        dispatch(setAuthenticated(false));
      }

      // setReady(true);
    };

    initKeycloak();
  }, [dispatch]);

  // if (!ready) return <div>Loading...</div>;

  return <>{children}</>;
};
