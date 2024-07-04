import { useLoansContext } from "../contexts/loansContext"
import { useBooksContext } from "../contexts/booksContext"
import { useUsersContext } from "../contexts/usersContext"
import { useEffect } from "react"
import Queue from "../dataEstructures/Queue"
import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const RequestAdminTable = () => {

    const { books, setBooks } = useBooksContext()
    const { loans, setLoans } = useLoansContext()
    const { users } = useUsersContext()
    const requestedLoans = loans.filter(loan => loan.state === "Pending")
    const loansQueue = new Queue()
    requestedLoans.forEach(element => loansQueue.enqueue(element))
    const queue = {
        front: loansQueue.front,
        rear: loansQueue.rear,
        size: loansQueue.size
    }

    const handleAccept = (loanId) => {
        setLoans(prevLoans =>
          prevLoans.map(loan => loan.id === loanId ? {...loan, state: "Accepted" } : loan)
      )
    }
    
    const handleReject = (loanId) => {
        setLoans(prevLoans =>
          prevLoans.map(loan => loan.id === loanId ? { ...loan, state: "Rejected" } : loan)
        )
    }

    useEffect(() => {
      // Actualizar la disponibilidad del libro una vez que los préstamos se hayan actualizado
      loans.forEach(loan => {
        if (loan.state === "Accepted") {
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
                <td colSpan="6">No hay solicitudes pendientes.</td>
              </tr>
            )
        }

        const rows = []
    
        while (!loansQueue.isEmpty()) {
          const actualLoan = loansQueue.dequeue()
          const user = users.find(user => user.id === actualLoan.userId)
          const book = books.find(book => book.id === actualLoan.bookId)
    
          if (!book || !user) {
            continue // Saltar a la siguiente iteración si no se encuentran el libro o el usuario
          }
    
          rows.push(
            <tr key={actualLoan.id}>
              <td>{book.title}</td>
              <td>{user.username}</td>
              <td>{actualLoan.loanDate}</td>
              <td>{actualLoan.returnDate}</td>
              <td>
                <Button onClick={() => handleAccept(actualLoan.id)} variant="contained" color="success" startIcon={<CheckCircleIcon />}>
                Aceptar
                </Button>
              </td>
              <td>
                <Button onClick={() => handleReject(actualLoan.id)} variant="contained" color="error" startIcon={<CancelIcon />}>
                  Rechazar
                </Button>
              </td>
            </tr>
          )
        }
    
        return rows
    }

    return (
        console.log(queue),
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Nombre</th>
                    <th>Fecha de prestamo</th>
                    <th>Fecha de devolucion</th>
                    <th>Aceptar</th>
                    <th>Rechazar</th>
                </tr>
            </thead>
            <tbody>
                {renderLoans()}
            </tbody>
        </table>
    )
}