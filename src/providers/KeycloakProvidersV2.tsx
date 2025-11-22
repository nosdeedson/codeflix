import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { keycloak } from "../keycloakConfig";
import { setAuthenticated, setToken, setUserDetails } from "../features/auth/authSlice";

type AuthContextType = {
  loginWithCredentials : (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used with keycloakProvider');
  return context;
}

export const KeycloakProviderV2 = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch();

    const loginWithCredentials = async (username: string, password: string) => {
      const params = new URLSearchParams();
      params.append('client_id', 'codeFlix');
      // params.append('client_secret', 'ztt5K3vEQeUF2cEiWbSI57V3x8CA2ga0');
      params.append('grant_type', 'password');
      params.append('username', username);
      params.append('password', password);

      try {
        const response = await fetch(
          'http://localhost:8080/realms/codeflix/protocol/openid-connect/token',
          {
            body: params,
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        if(!response.ok){
          throw new Error('Invalid credencials');
        }
        const data = await response.json();

        dispatch(setToken(data.access_token));
        dispatch(setAuthenticated(true));

        const userInfoRes = await fetch(
          'http://localhost:8080/realms/codeflix/protocol/openid-connect/userinfo',
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`
            }
          }
        );

        const userInfo = await userInfoRes.json();
        dispatch(setUserDetails(userInfo));

      } catch (error) {
        setAuthenticated(false);
        console.log(error);
      }

    }

    return(
      <AuthContext.Provider value={{loginWithCredentials}} >
        {children}
      </AuthContext.Provider>
    )
}
