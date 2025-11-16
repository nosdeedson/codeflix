import { selectIsAuthenticated } from "../features/auth/authSlice"
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    if(!isAuthenticated){
        return <Navigate to="/login" />
    }
    return <>{children}</>
}