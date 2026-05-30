import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error(
            'useAuth() must be used inside an <AuthProvider>. ' +
            'Wrap your App component with <AuthProvider> in main.jsx.'
        );
    }

    return context;
}
