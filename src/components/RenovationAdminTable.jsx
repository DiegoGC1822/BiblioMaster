import { useLoansContext } from "../contexts/loansContext"
import { useBooksContext } from "../contexts/booksContext"
import { useUsersContext } from "../contexts/usersContext"
import { useEffect, useState } from "react"
import quickSort from "../algorithms/QuickSort"
import LinkedList from "../dataEstructures/LinkedList"
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Button from '@mui/material/Button'
// Función para agregar días a una fecha
const addDaysToDate = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result.toISOString().split('T')[0] // Formato YYYY-MM-DD
}

export const RenovationAdminTable = ({criterion}) => {
    const { books, setBooks } = useBooksContext()
    const { loans, setLoans } = useLoansContext()
    const { users } = useUsersContext()
    const [loansList, setLoansList] = useState(null)

    // Inicializar la lista de préstamos solo cuando `loans` cambia
    useEffect(() => {
        const acceptedLoans = loans.filter(loan => loan.state === "Pending Renovation")
        const linkedLoans = new LinkedList()
        acceptedLoans.forEach(element => linkedLoans.add(element))
        const sortedLoans = quickSort(linkedLoans, criterion, books, users)
        setLoansList(sortedLoans)
    }, [loans, criterion, setLoansList])

    const handleRenew = (loanId) => {
        console.log(loanId)
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

    console.log(loansList)

    const renderLoans = () => {
        if  (!loansList || loansList.isEmpty()) {
            return (
                <tr>
                    <td colSpan="5">No hay solicitudes aceptadas.</td>
                </tr>
            )
        }

        const rows = []

        let actualLoan = loansList.head
        while (actualLoan) {
            const user = users.find(user => user.id === actualLoan.value.userId)
            const book = books.find(book => book.id === actualLoan.value.bookId)

            if (!book || !user) {
                actualLoan = actualLoan.next
                continue
            }

            const id = actualLoan.value.id

            rows.push(
                <tr key={actualLoan.value.id}>
                    <td>{book.title}</td>
                    <td>{user.username}</td>
                    <td>{actualLoan.value.loanDate}</td>
                    <td>{actualLoan.value.returnDate}</td>
                    <td>
                        {actualLoan.value.state === "Renewed" ? (
                            "Renovado"
                        ) : (
                            <Button onClick={() => handleRenew(id)} variant="contained" color="success" startIcon={<ChangeCircleIcon />}>
                                Renovar
                            </Button>
                        )}
                    </td>
                </tr>
            )

            actualLoan = actualLoan.next
        }

        return rows
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Usuario</th>
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
