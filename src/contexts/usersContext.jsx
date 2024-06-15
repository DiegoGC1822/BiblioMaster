import { useState, createContext, useContext } from "react";
import db from '../db.json'

const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
    const [users, setUsers] = useState(db.users)

    const value = {
        users,
        setUsers
    }

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => {
    const context = useContext(UsersContext)

    if (context === undefined) {   
        throw new Error('useBookContext must be used within a BookContextProvider')
    }

    return context
}