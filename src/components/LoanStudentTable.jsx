import { useLoansContext } from "../contexts/loansContext"
import { useUserContext } from "../contexts/userContext"
import { useBooksContext } from "../contexts/booksContext"
import { fechaFormateada } from "../utils/FechaFormateada"

export const LoanStudentTable = () => {

    const { loans, setLoans } = useLoansContext()
    const { actualUser } = useUserContext()
    const { books } = useBooksContext()

    const handleNewLoan = (book) => {

        const currentDate = new Date()
        const returnDate = new Date()
        returnDate.setDate(currentDate.getDate() + 14)

        const newLoan = {
            id: loans.length + 1,
            bookId: book.id,
            userId: actualUser.id,
            loanDate: fechaFormateada(currentDate),
            returnDate: fechaFormateada(returnDate),
            state: "Pending"
        }
        setLoans((prevLoans) => [...prevLoans, newLoan])
        console.log(loans)
    }

    const handleLoan = (book) => {
        const userLoans = loans.filter(loan => loan.bookId === book.id && loan.userId === actualUser.id)
        const userLoan = userLoans.length > 0 ? userLoans[userLoans.length - 1] : null
        
        if (!book.available || (userLoan && (userLoan.state === "Pending" || userLoan.state === "Accepted"))) {
            return "Reservado"
        } else if (userLoan && (userLoan.state === "Rejected" || userLoan.state === "Returned")) {
            return <button onClick={() => handleNewLoan(book)}>Reservar</button>
        } else if (!userLoan) {
            return <button onClick={() => handleNewLoan(book)}>Reservar</button>
        } else {
            return "Reservado"
        }
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Reserva</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book) => {

                            return (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{handleLoan(book)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}