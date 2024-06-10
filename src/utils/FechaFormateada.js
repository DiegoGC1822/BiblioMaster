export const fechaFormateada = (date) => {
    let dia = date.getDate();
    let mes = date.getMonth() + 1; 
    let año = date.getFullYear();
    dia = dia < 10 ? "0" + dia : dia;
    mes = mes < 10 ? "0" + mes : mes;
    return `${dia}/${mes}/${año}`    
}