import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [loggedInUserId, setLoggedInUserId] = useState(1);

    return (
        <UserContext.Provider value={{ loggedInUserId, setLoggedInUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
