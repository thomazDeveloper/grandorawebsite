import React, { createContext } from 'react';
import useAuthorization from '../hooks/useAuthorization';

//create authcontext to track author
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    //get firebase hook and pass it via context 
    const allContexts = useAuthorization();

    //return context provider
    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;