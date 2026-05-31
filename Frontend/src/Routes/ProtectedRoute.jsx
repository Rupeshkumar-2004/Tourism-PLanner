import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function ProtectedRoute(){
    const { isAuthenticated, isLoading } = useAuth();

    if(isLoading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
            </div>
        );
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

    return <Outlet />
}

export default ProtectedRoute;