import { Header } from "../components/Header"
import { RequestAdminTable } from "../components/RequestAdminTable"
import { RenovationAdminTable } from "../components/RenovationAdminTable"
import { useLocation } from "react-router-dom"

export const Loan = () => {

    const location = useLocation()

    const handleLoan = () => {
        if(location.pathname === "/pending"){
            return <RequestAdminTable/>
        }else{
            return <RenovationAdminTable/>
        }
    }


    return (
        <div>
            <Header/>
            {handleLoan()}
        </div>
    )
}