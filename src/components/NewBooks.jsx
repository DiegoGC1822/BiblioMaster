import React, { useState } from "react";
import { useBooksContext } from "../contexts/booksContext";

export const NewBooks = () => {
    const { books, setBooks } = useBooksContext();

    const [formState, setFormState] = useState({
        title: "",
        author: "",
        category: "",
        available: true
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevFormState) => ({
            ...prevFormState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Validación de campos (como ya tienes)
    
        const newBook = {
            id: books.length + 1,
            title: formState.title,
            author: formState.author,
            category: formState.category,
            available: true // Puedes ajustar esto según la lógica de tu aplicación
        };
    
        setBooks((prevBooks) => [...prevBooks, newBook]);
    
        console.log("Libro agregado:", newBook); // Mostrar el libro agregado en la consola
    
        setFormState({
            title: "",
            author: "",
            category: "",
            available: true
        });
    };    

    return (
        <div>
            <h1>New Books</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">Autor:</label>
                    <input
                        type="text"
                        name="author"
                        value={formState.author}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="category">Categoría:</label>
                    <input
                        type="text"
                        name="category"
                        value={formState.category}
                        onChange={handleChange}
                    />
                </div>
                {/* Podrías agregar más campos según sea necesario */}
                <button type="submit">Agregar Libro</button>
            </form>
        </div>
    );
};
