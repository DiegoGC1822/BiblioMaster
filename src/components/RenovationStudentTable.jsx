import React, { useState } from 'react';
import { useLoansContext } from '../contexts/loansContext';
import { useBooksContext } from '../contexts/booksContext';
import { useUserContext } from '../contexts/userContext';
import MaxHeap from '../dataEstructures/MaxHeap';
import { mergeSort } from '../algorithms/Mergesort';

export const RenovationStudentTable = () => {
    const { loans } = useLoansContext();
    const { books } = useBooksContext();
    const { actualUser } = useUserContext();
    const [renewalRequests, setRenewalRequests] = useState([]);

    // Filtrar solo las reservas aceptadas del usuario actual
    const acceptedLoans = loans.filter(loan => loan.userId === actualUser.id && loan.state === 'Accepted');

    // Lógica del MaxHeap (estructura de datos) y el Mergesort (algoritmo)
    const heap = new MaxHeap();
    acceptedLoans.forEach(loan => heap.insertar(loan));
    const sortedLoans = mergeSort(acceptedLoans);

    const pendingRenewe = (loanId) => {
        setRenewalRequests(prevState => [...prevState, loanId]);
    };

    return (
        <div>
            <h1>Renovation Student Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Categoría</th>
                        <th>Fecha de reserva</th>
                        <th>Fecha de aceptación</th>
                        <th>Solicitud</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedLoans.map((loan) => {
                        const book = books.find(b => b.id === loan.bookId);
                        if (!book) return null;

                        const esSolicitado = renewalRequests.includes(loan.id);

                        return (
                            <tr key={loan.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>{loan.loanDate}</td>
                                <td>{loan.acceptanceDate}</td>
                                <td>
                                    {esSolicitado ? (
                                        'Solicitud enviada'
                                    ) : (
                                        <button onClick={() => pendingRenewe(loan.id)}>
                                            Solicitar renovación
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
