export const SortLoans = ({criterion, setCriterion}) => {
    return (
        <div>
            <select value={criterion} onChange={(e) => setCriterion(e.target.value)}>
                <option value="loanDate">Fecha de prestamo</option>
                <option value="returnDate">Fecha de devolució́n</option>
            </select>
        </div>
    )
}