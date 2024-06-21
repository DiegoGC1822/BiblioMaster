import { useLoansContext } from "../contexts/loansContext"
import { useBooksContext } from "../contexts/booksContext"
import { useUsersContext } from "../contexts/usersContext"
import { useEffect } from "react"
import Queue from "../dataEstructures/Queue"

// Función para agregar días a una fecha
const addDaysToDate = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result.toISOString().split('T')[0] // Formato YYYY-MM-DD
}

export const RenovationAdminTable = () => {
    const { books, setBooks } = useBooksContext()
    const { loans, setLoans } = useLoansContext()
    const { users } = useUsersContext()

    // Filtrar préstamos aceptados o renovados
    const acceptedLoans = loans.filter(loan => loan.state === "Accepted" || loan.state === "Renewed")
    const loansQueue = new Queue()
    acceptedLoans.forEach(element => loansQueue.enqueue(element))

    const handleRenew = (loanId) => {
        setLoans(prevLoans =>
            prevLoans.map(loan => 
                loan.id === loanId ? { 
                    ...loan, 
                    state: "Renewed",
                    returnDate: addDaysToDate(loan.returnDate, 14) 
                } : loan
            )
        )
    }

    useEffect(() => {
        // Actualizar la disponibilidad del libro una vez que los préstamos se hayan actualizado
        loans.forEach(loan => {
            if (loan.state === "Accepted" || loan.state === "Renewed") {
                setBooks(prevBooks =>
                    prevBooks.map(book =>
                        book.id === loan.bookId ? { ...book, available: false } : book
                    )
                )
            }
        })
    }, [loans, setBooks])

    const renderLoans = () => {
        if (loansQueue.isEmpty()) {
            return (
                <tr>
                    <td colSpan="5">No hay solicitudes aceptadas.</td>
                </tr>
            )
        }

        const rows = []

        while (!loansQueue.isEmpty()) {
            const actualLoan = loansQueue.dequeue()
            const user = users.find(user => user.id === actualLoan.userId)
            const book = books.find(book => book.id === actualLoan.bookId)

            if (!book || !user) {
                continue
            }

            rows.push(
                <tr key={actualLoan.id}>
                    <td>{book.title}</td>
                    <td>{user.username}</td>
                    <td>{actualLoan.loanDate}</td>
                    <td>{actualLoan.returnDate}</td>
                    <td>
                        {actualLoan.state === "Renewed" ? (
                            "Renovado"
                        ) : (
                            <button onClick={() => handleRenew(actualLoan.id)}>Renovar</button>
                        )}
                    </td>
                </tr>
            )
        }

        return rows
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Nombre</th>
                    <th>Fecha de prestamo</th>
                    <th>Fecha de devolucion</th>
                    <th>Renovar</th>
                </tr>
            </thead>
            <tbody>
                {renderLoans()}
            </tbody>
        </table>
    )
}
