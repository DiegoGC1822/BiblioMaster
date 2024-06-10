import { useState, createContext, useContext } from "react";
import db from '../db.json'

const LoansContext = createContext();

export const LoansContextProvider = ({ children }) => {
    const [loans, setLoans] = useState(db.loans)

    const value = {
        loans,
        setLoans
    }

    return (
        <LoansContext.Provider value={value}>
            {children}
        </LoansContext.Provider>
    )
}

export const useLoansContext = () => {
    const context = useContext(LoansContext)

    if (context === undefined) {   
        throw new Error('useLoanContext must be used within a LoanContextProvider')
    }

    return context
}