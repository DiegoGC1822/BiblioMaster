import { useLoansContext } from "../contexts/loansContext"
import { useUserContext } from "../contexts/userContext"
import { useBooksContext } from "../contexts/booksContext"

export const LoanStudentTable = () => {

    const { loans, setLoans } = useLoansContext()
    const { actualUser } = useUserContext()
    const { books } = useBooksContext()

    const handleNewLoan = (book) => {

        const currentDate = new Date()
        let loanDate = new Date()
        let returnDate = new Date()
        loanDate.setDate(currentDate.getDate() + 3)
        loanDate = loanDate.toISOString().split('T')[0]
        returnDate.setDate(currentDate.getDate() + 17)
        returnDate = returnDate.toISOString().split('T')[0]

        const newLoan = {
            id: loans.length + 1,
            bookId: book.id,
            userId: actualUser.id,
            loanDate: loanDate,
            returnDate: returnDate,
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
        }
        return <button onClick={() => handleNewLoan(book)}>Reservar</button>
        
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
                        <th>Estado</th>
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
                                    <td>{book.available? "Disponible": "Ocupado"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}