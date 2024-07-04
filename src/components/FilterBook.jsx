import { useBooksContext } from "../contexts/booksContext";
import BST from "../dataEstructures/BST";
import { useState } from "react";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export const FilterBook = ({ setWord, word, activate, setActivate }) => {
    const { books } = useBooksContext();
    const [searchResult, setSearchResult] = useState([]);
    const [searchCriterion, setSearchCriterion] = useState("title");

    const tree = new BST();
    books.forEach(book => tree.insert(book,searchCriterion));

    const handleWord = (e) => {
        e.preventDefault();

        if (activate) {
            const result = tree.search(word.trim(), searchCriterion);
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
            <form onSubmit={handleWord} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", marginBottom: "20px"}}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <FormControl>
                        <Select 
                            value={searchCriterion}
                            onChange={(e) => setSearchCriterion(e.target.value)}
                        >
                            <MenuItem value={'title'}>Titulo</MenuItem>
                            <MenuItem value={'author'}>Autor</MenuItem>
                            <MenuItem value={'category'}>Categoria</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Palabra clave" value={word} onChange={(e) => setWord(e.target.value)} sx={{ width: 300 }}/>
                    <Button variant="contained" type="submit" startIcon={<SearchIcon />} sx={{ height: 50 }}>
                        {activate ? "Buscar" : "Cancelar"}
                    </Button>
                </div>
            </form>
            {searchResult.length > 0 &&
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", marginTop: "20px" }}>Resultados de la búsqueda</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <Stack
                            spacing={2}
                            direction={"row"}
                            divider={<Divider orientation="vertical" flexItem />}
                        >
                                {searchResult.map((book) => (
                                    <Box key={book.id}>
                                        <p style={{fontWeight: "bold"}}>Título: {book.title}</p>
                                        <p>Autor: {book.author}</p>
                                        <p>Categoría: {book.category}</p>
                                        <p>Disponible: {book.available ? 'Sí' : 'No'}</p>
                                    </Box>
                                ))}
                        </Stack>  
                    </Box>   
                </Box>
            }
        </>
    );
}
