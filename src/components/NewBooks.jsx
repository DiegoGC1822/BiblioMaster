import React, { useState } from "react";
import { useBooksContext } from "../contexts/booksContext";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "87vh" }}>
            <Paper sx={{ padding: "2rem" }}>
                <Typography variant="h3" sx={{ marginBottom: "1rem", textAlign: "center", fontFamily: "Roboto, sans-serif" }}>
                    Agregar libro
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Título"
                            name="title"
                            value={formState.title}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Autor"
                            name="author"
                            value={formState.author}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Categoría"
                            name="category"
                            value={formState.category}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" variant="contained">Agregar Libro</Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    );
};
