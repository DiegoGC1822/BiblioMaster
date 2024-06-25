import React, { useState } from "react";
import { useBooksContext } from "../contexts/booksContext";
import { searchBooks } from "../algorithms/IndexedSearch"; // Importamos la función searchBooks desde IndexedSearch.js

export const EditBooks = () => {
    const { books, setBooks } = useBooksContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchKey, setSearchKey] = useState("title"); // Estado para la clave de búsqueda inicial (por título)
    const [editingBookId, setEditingBookId] = useState(null); // Estado para el ID del libro que se está editando
    const [editFormData, setEditFormData] = useState({
        title: "",
        author: "",
        category: "",
        available: true, // Inicialmente consideramos que el libro está disponible
    });

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchKeyChange = (event) => {
        setSearchKey(event.target.value);
    };

    // Usamos la función searchBooks para obtener los libros filtrados según el término y la clave de búsqueda
    const filteredBooks = searchBooks(books, searchTerm, searchKey);

    const handleEditClick = (bookId) => {
        // Encontramos el libro actual en base al ID
        const bookToEdit = books.find((book) => book.id === bookId);

        // Llenamos el formulario de edición con los datos actuales del libro
        setEditFormData({
            title: bookToEdit.title,
            author: bookToEdit.author,
            category: bookToEdit.category,
            available: bookToEdit.available,
        });

        // Establecemos el ID del libro que se está editando
        setEditingBookId(bookId);
    };

    const handleCancelClick = () => {
        // Limpiamos el formulario de edición y reseteamos el estado de edición
        setEditingBookId(null);
        setEditFormData({
            title: "",
            author: "",
            category: "",
            available: true,
        });
    };

    const handleSaveClick = () => {
        // Actualizamos el libro editado en el contexto de libros
        const updatedBooks = books.map((book) => {
            if (book.id === editingBookId) {
                return {
                    ...book,
                    title: editFormData.title,
                    author: editFormData.author,
                    category: editFormData.category,
                    available: editFormData.available,
                };
            }
            return book;
        });

        setBooks(updatedBooks);

        // Limpiamos el formulario y reseteamos el estado de edición
        setEditingBookId(null);
        setEditFormData({
            title: "",
            author: "",
            category: "",
            available: true,
        });
    };

    return (
        <div>
            <h1>Edit Books</h1>
            <div>
                <label htmlFor="searchTerm">Buscar:</label>
                <input
                    type="text"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <select value={searchKey} onChange={handleSearchKeyChange}>
                    <option value="title">Título</option>
                    <option value="author">Autor</option>
                    <option value="category">Categoría</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Categoría</th>
                        <th>Disponibilidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>{book.available ? "Disponible" : "No disponible"}</td>
                            <td>
                                {editingBookId === book.id ? (
                                    <>
                                        <button onClick={handleSaveClick}>Guardar</button>
                                        <button onClick={handleCancelClick}>Cancelar</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEditClick(book.id)}>Editar</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingBookId && (
                <div>
                    <h2>Editar Libro</h2>
                    <form>
                        <div>
                            <label htmlFor="editTitle">Título:</label>
                            <input
                                type="text"
                                id="editTitle"
                                value={editFormData.title}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, title: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="editAuthor">Autor:</label>
                            <input
                                type="text"
                                id="editAuthor"
                                value={editFormData.author}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, author: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="editCategory">Categoría:</label>
                            <input
                                type="text"
                                id="editCategory"
                                value={editFormData.category}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, category: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="editAvailable">Disponibilidad:</label>
                            <input
                                type="checkbox"
                                id="editAvailable"
                                checked={editFormData.available}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, available: e.target.checked })
                                }
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
