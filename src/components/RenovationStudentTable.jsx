import React from 'react';
import { useLoansContext } from '../contexts/loansContext';
import { useBooksContext } from '../contexts/booksContext';
import { useUserContext } from '../contexts/userContext';
import MaxHeap from '../dataEstructures/MaxHeap';
import { mergeSort } from '../algorithms/Mergesort';

export const RenovationStudentTable = () => {
    const { loans, setLoans } = useLoansContext();
    const { books } = useBooksContext();
    const { actualUser } = useUserContext();

    // Filtrar solo las reservas aceptadas del usuario actual
    const acceptedLoans = loans.filter(loan => loan.userId === actualUser.id && ( loan.state === "Accepted" || 
        loan.state === "Renewed" || loan.state === "Pending Renovation" ) );

    // Lógica del MaxHeap (estructura de datos) y el Mergesort (algoritmo)
    const heap = new MaxHeap();
    acceptedLoans.forEach(loan => heap.insertar(loan));
    const sortedLoans = mergeSort(acceptedLoans);

    const pendingRenewe = (loanId) => {
        setLoans(prevLoans =>
            prevLoans.map(loan => 
                loan.id === loanId ? { 
                    ...loan, 
                    state: "Pending Renovation",
                } : loan
            )
        )
    };

    const renderButton = (loanState, loanId) => {
        const stateActions = {
            "Pending Renovation": "Esperando renovación",
            "Renewed": "Renovada",
            "Accepted": <button onClick={() => pendingRenewe(loanId)}>Renovar</button>
        };
        return stateActions[loanState] || null;
    };

    return (
        <div>
            <h1>Tabla de renovación</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Categoría</th>
                        <th>Fecha de reserva</th>
                        <th>Solicitud</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedLoans.map((loan) => {
                        const book = books.find(b => b.id === loan.bookId);
                        if (!book) return null;

                        return (
                            <tr key={loan.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>{loan.loanDate}</td>
                                <td>
                                    {renderButton(loan.state, loan.id)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
