import { useLoansContext } from "../contexts/loansContext"
import { useBooksContext } from "../contexts/booksContext"
import { users } from "../db.json"
import Queue from "../dataEstructures/Queue"

export const RequestAdminTable = () => {

    const { books } = useBooksContext()
    const { loans } = useLoansContext()
    const existedUsers = users
    const loansQueue = new Queue()
    loans.forEach(element => loansQueue.enqueue(element))

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
                
            </tbody>
        </table>
    )
}