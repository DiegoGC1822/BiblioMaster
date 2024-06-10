import { useBooksContext } from "../contexts/booksContext"
import BST from "../dataEstructures/BST"
import { useState } from "react"

export const FilterBook = ({setWord,word,activate,setActivate}) =>{

    const { books } = useBooksContext()
    const tree = new BST()
    const [searchResult, setSearchResult] = useState(null)
    books.forEach(book => tree.insert(book))

    const handleWord = (e)=>{
        e.preventDefault()

        if (activate) {
          const result = tree.search(word)
          setSearchResult(result)
        } else {
          setWord("") 
          setSearchResult(null)
        }
    
        setActivate((prevActivate) => !prevActivate)    
    }

    return (
        <>  
            <form onSubmit={handleWord}>
                <input type="text" value={word} onChange={(e)=>setWord(e.target.value)} />
                <button>
                    {activate? "Buscar":  "Cancelar"}
                </button>
            </form>
            {searchResult && 
                <div>
                    <h2>Resultado de la búsqueda:</h2>
                    <p>Título: {searchResult.title}</p>
                    <p>Autor: {searchResult.author}</p>
                    <p>Categoría: {searchResult.category}</p>
                    <p>Disponible: {searchResult.available ? 'Sí' : 'No'}</p>
                </div>
            }
        </>
    )
}
