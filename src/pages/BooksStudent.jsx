import { Header } from "../components/Header"
import { useLocation } from "react-router-dom"
import { LoanStudentTable } from "../components/LoanStudentTable"
import { RequestStudentTable } from "../components/RequestStudentTable"
import { RenovationStudentTable } from "../components/RenovationStudentTable"


export const BooksStudent = () => {

    const location = useLocation()

    const handleBooks = () => {
        if(location.pathname === '/bookloan') {
            return <LoanStudentTable/>
        }else if(location.pathname === '/request') {
            return <RequestStudentTable/>
        }else{
            return <RenovationStudentTable/>
        }
    }


    return (
        <div>
            <Header/>
            {handleBooks()}
        </div>
    )
}