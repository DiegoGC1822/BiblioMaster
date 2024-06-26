import { useLoansContext } from "../contexts/loansContext"
import { useBooksContext } from "../contexts/booksContext"
import { useUserContext } from "../contexts/userContext"

export const RequestStudentTable = () => {

    const { loans } = useLoansContext()
    const { books } = useBooksContext()
    const { actualUser } = useUserContext()

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Fecha de solicitud</th>
                        <th>Fecha de devolución</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loans.map((loan) => {
                            const book = books.find(book => book.id === loan.bookId && loan.userId === actualUser.id)

                            if (!book) {
                                return null
                            }
                            
                            return (
                                <tr key={loan.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{loan.loanDate}</td>
                                    <td>{loan.returnDate}</td>
                                    <td>{loan.state}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div> 
    )
}