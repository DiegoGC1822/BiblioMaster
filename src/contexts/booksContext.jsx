import { useState, createContext, useContext } from "react";
import db from '../db.json'

const BooksContext = createContext();

export const BooksContextProvider = ({ children }) => {
    const [books, setBooks] = useState(db.books)

    const value = {
        books,
        setBooks
    }

    return (
        <BooksContext.Provider value={value}>
            {children}
        </BooksContext.Provider>
    )
}

export const useBooksContext = () => {
    const context = useContext(BooksContext)

    if (context === undefined) {   
        throw new Error('useBookContext must be used within a BookContextProvider')
    }

    return context
}