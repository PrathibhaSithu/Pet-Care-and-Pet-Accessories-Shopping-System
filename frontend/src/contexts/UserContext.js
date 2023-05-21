import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const LOCAL_STORAGE_KEY = 'user';

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
