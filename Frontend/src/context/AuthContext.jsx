import { useCallback, useEffect, useRef, useState } from 'react';
import * as authService from '../services/authServices.js';
import { AuthContext } from './AuthContext.js';

export function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const authVersionRef = useRef(0);

    const isAuthenticated = !!user;

    useEffect(() => {
        const checkAuth = async () => {
            const authVersion = authVersionRef.current;

            try{
                const userData = await authService.getCurrentUser();

                if(authVersionRef.current === authVersion){
                    setUser(userData);
                }
            }
            catch{
                if(authVersionRef.current === authVersion){
                    setUser(null);
                }
            }
            finally{
                if(authVersionRef.current === authVersion){
                    setIsLoading(false);
                }
            }
        };

        checkAuth();
    }, []);

    const login = useCallback( async (credentials) => {
        authVersionRef.current += 1;
        setError(null);

        try{
            const response = await authService.login(credentials);

            setUser(response.user);
            setIsLoading(false);
            return response;
        }
        catch(error){
            const message = error.response?.data?.message || 'Login failed';

            setError(message);
            throw error;
        }
    }, []);

    const signup = useCallback(async (userData) => {
        authVersionRef.current += 1;
        setError(null);

        try{
            const response = await authService.signup(userData);

            setUser(response.user);
            setIsLoading(false);
            return response;
        }
        catch(error){
            const message = error.response?.data?.message || 'Login failed';

            setError(message);
            throw error;
        }
    }, []);

    const logout = useCallback( () => {
        authVersionRef.current += 1;
        setError(null);
        setUser(null);
        setIsLoading(false);

    }, []);

    const clearError = useCallback( () => {
        setError(null);
    },[]);

    const value = {
            user, 
            isAuthenticated, 
            isLoading, 
            error,
            login,
            signup, 
            logout,
            clearError
    };

    return(
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );
}
