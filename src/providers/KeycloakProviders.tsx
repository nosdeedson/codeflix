import React, { useEffect } from "react"
import { useAppDispatch } from "../app/hooks"
import { keycloak } from "../keycloakConfig"
import { setAuthenticated, setToken, setUserDetails } from "../features/auth/authSlice"

export const KeycloakProvider = async ({
    children
}: {
    children: React.ReactNode
}) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const initKeyCloak = async () => {
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'login-required'
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
                console.log(error);
                dispatch(setAuthenticated(false));
            }
        };

        keycloak.onTokenExpired = () => {
            return null;
        }
        initKeyCloak()
    }, [dispatch])


    return <>{children}</>


}