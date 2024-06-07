import { useState, createContext, useContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [actualUser, setActualUser] = useState({})

    const value = {
        actualUser,
        setActualUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)

    if (context === undefined) {   
        throw new Error('useUserContext must be used within a UserContextProvider')
    }

    return context
}