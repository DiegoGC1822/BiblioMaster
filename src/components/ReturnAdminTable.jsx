import { useLoansContext } from "../contexts/loansContext"
import { useBooksContext } from "../contexts/booksContext"
import { useUsersContext } from "../contexts/usersContext"
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Button from '@mui/material/Button'

export const ReturnAdminTable = () => {
    const { loans, setLoans } = useLoansContext()
    const { books } = useBooksContext()
    const { users } = useUsersContext()
    const actualLoans = loans.filter(loan => loan.state === "Accepted" || loan.state === "Renewed")

    const handleReturn = (loanId) => {
        setLoans(prevLoans =>
            prevLoans.map(loan =>
                loan.id === loanId ? { ...loan, state: "Returned" } : loan
            )
        )
    }

    const renderLoans = () => {
        return actualLoans.map(loan => {
            const book = books.find(book => book.id === loan.bookId)
            const user = users.find(user => user.id === loan.userId)
            return (
                <tr key={loan.id}>
                    <td>{book ? book.title : ""}</td>
                    <td>{user ? user.username : ""}</td>
                    <td>{loan.loanDate}</td>
                    <td>{loan.returnDate}</td>
                    <td>{loan.state}</td>
                    <td>
                        <Button variant="contained" onClick={() => handleReturn(loan.id)} startIcon={<DoneOutlineIcon />} >
                            Devuelto
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Usuario</th>
                    <th>Fecha de prestamo</th>
                    <th>Fecha de devolució́n</th>
                    <th>Estado</th>
                    <th>Reportar como devuelto</th>
                </tr>
            </thead>
            <tbody>
                {renderLoans()}
            </tbody>
        </table>
    )
}