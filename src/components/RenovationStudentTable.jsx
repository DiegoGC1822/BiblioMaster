import React from 'react';
import { useLoansContext } from '../contexts/loansContext';
import { useBooksContext } from '../contexts/booksContext';
import { useUserContext } from '../contexts/userContext';
import MaxHeap from '../dataEstructures/MaxHeap';
import { mergeSort } from '../algorithms/Mergesort'; // Importa directamente la función mergeSort

export const RenovationStudentTable = () => {
    const { loans } = useLoansContext();
    const { books } = useBooksContext();
    const { actualUser } = useUserContext();

    // Filtrar solo las reservas aceptadas del usuario actual
    const acceptedLoans = loans.filter(loan => loan.userId === actualUser.id && loan.state === 'Accepted');

    // Agregar lógica para MaxHeap y mergeSort
    const heap = new MaxHeap();
    acceptedLoans.forEach(loan => heap.insert(loan));
    const sortedLoans = mergeSort(acceptedLoans); // Usa mergeSort directamente

    const handleRenewalRequest = (loanId) => {
        // Lógica para solicitar renovación
        console.log(`Solicitando renovación para préstamo con ID ${loanId}`);
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
                        <th>Solicitar renovación</th>
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
                                <td>{loan.acceptanceDate}</td>
                                <td>
                                    <button onClick={() => handleRenewalRequest(loan.id)}>Solicitar renovación</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
