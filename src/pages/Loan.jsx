import { Header } from "../components/Header"
import { RequestAdminTable } from "../components/RequestAdminTable"
import { LoanHistory } from "../components/LoanHistory"
import { useLocation } from "react-router-dom"

export const Loan = () => {

    const location = useLocation()

    const handleLoan = () => {
        if(location.pathname === "/pending"){
            return <RequestAdminTable/>
        }else{
            return <LoanHistory/>
        }
    }


    return (
        <div>
            <Header/>
            {handleLoan()}
        </div>
    )
}