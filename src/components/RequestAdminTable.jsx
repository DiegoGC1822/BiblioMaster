import { useLoansContext } from "../contexts/loansContext"
import { useBooksContext } from "../contexts/booksContext"
import { users } from "../db.json"
import Queue from "../dataEstructures/Queue"

export const RequestAdminTable = () => {

    const { books } = useBooksContext()
    const { loans, setLoans } = useLoansContext()
    const existedUsers = users
    const requestedLoans = loans.filter(loan => loan.state === "Pending")
    const loansQueue = new Queue()
    requestedLoans.forEach(element => loansQueue.enqueue(element))

    const handleAccept = (loanId) => {
        setLoans(prevLoans =>
          prevLoans.map(loan =>
            loan.id === loanId ? { ...loan, state: "Accepted" } : loan
          )
        )
    }
    
    const handleReject = (loanId) => {
        setLoans(prevLoans =>
          prevLoans.map(loan =>
            loan.id === loanId ? { ...loan, state: "Rejected" } : loan
          )
        )
    }
    

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
          const user = existedUsers.find(user => user.id === actualLoan.userId)
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
              <td><button onClick={() => handleAccept(actualLoan.id)}>Aceptar</button></td>
              <td><button onClick={() => handleReject(actualLoan.id)}>Rechazar</button></td>
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