// Función para buscar libros por título, autor o categoría
export const searchBooks = (books, searchTerm, searchKey) => {
    if (!searchTerm) {
        return books; // Si no hay término de búsqueda, retornamos todos los libros
    }

    // Convertimos el término de búsqueda a minúsculas para una búsqueda insensible a mayúsculas
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filtramos los libros según la clave de búsqueda seleccionada (title, author, category)
    return books.filter((book) =>
        book[searchKey].toLowerCase().includes(lowerCaseSearchTerm)
    );
};
