import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        })
        return () => unsubscribe();
    }, [])

    const value = {
        currentUser: currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
