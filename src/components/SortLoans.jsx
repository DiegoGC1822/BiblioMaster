import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
export const SortLoans = ({criterion, setCriterion}) => {
    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
            <Select value={criterion} onChange={(e) => setCriterion(e.target.value)}>
                <MenuItem value="loanDate">Fecha de prestamo</MenuItem>
                <MenuItem value="returnDate">Fecha de devolución</MenuItem>
                <MenuItem value="bookTitle">Título del libro</MenuItem>
                <MenuItem value="username">Nombre del usuario</MenuItem>
            </Select>
        </div>
    )
}