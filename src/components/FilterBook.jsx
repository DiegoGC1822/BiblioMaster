import { useBooksContext } from "../contexts/booksContext";
import BST from "../dataEstructures/BST";
import { useState } from "react";

export const FilterBook = ({ setWord, word, activate, setActivate }) => {
    const { books } = useBooksContext();
    const [searchResult, setSearchResult] = useState([]);
    const [searchCriterion, setSearchCriterion] = useState("title"); // Nuevo estado para el criterio de búsqueda

    const tree = new BST();
    books.forEach(book => tree.insert(book,searchCriterion));

    const handleWord = (e) => {
        e.preventDefault();

        if (activate) {
            const result = tree.search(word.trim(), searchCriterion); // Pasar el criterio de búsqueda al método de búsqueda
            setSearchResult(result);
        } else {
            setWord("");
            setSearchResult([]);
        }

        setActivate((prevActivate) => !prevActivate);
        console.log(tree)
    };

    return (
        <>
            <form onSubmit={handleWord}>
                <select value={searchCriterion} onChange={(e) => setSearchCriterion(e.target.value)}>
                    <option value="title">Título</option>
                    <option value="author">Autor</option>
                    <option value="category">Categoría</option>
                </select>
                <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
                <button>
                    {activate ? "Buscar" : "Cancelar"}
                </button>
            </form>
            {searchResult.length > 0 && 
                <div>
                    <h1>Resultados</h1>
                    {searchResult.map((book) => (
                        <div key={book.id}>
                            <p>Título: {book.title}</p>
                            <p>Autor: {book.author}</p>
                            <p>Categoría: {book.category}</p>
                            <p>Disponible: {book.available ? 'Sí' : 'No'}</p>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}
