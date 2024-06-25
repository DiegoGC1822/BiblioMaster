export const SortLoans = ({criterion, setCriterion}) => {
    return (
        <div>
            <select value={criterion} onChange={(e) => setCriterion(e.target.value)}>
                <option value="loanDate">Fecha de prestamo</option>
                <option value="returnDate">Fecha de devolución</option>
                <option value="bookTitle">Título del libro</option>
                <option value="username">Nombre del usuario</option> 
            </select>
        </div>
    )
}