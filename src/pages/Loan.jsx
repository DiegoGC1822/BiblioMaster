import { Header } from "../components/Header"
import { RequestAdminTable } from "../components/RequestAdminTable"
import { RenovationAdminTable } from "../components/RenovationAdminTable"
import { SortLoans } from "../components/SortLoans"
import { useLocation } from "react-router-dom"
import { useState } from "react"

export const Loan = () => {

    const location = useLocation()
    const [criterion, setCriterion] = useState("loanDate")

    const handleLoan = () => {
        if(location.pathname === "/pending"){
            return <RequestAdminTable/>
        }else{
            return (
            <>
                <SortLoans criterion={criterion} setCriterion={setCriterion}/>
                <RenovationAdminTable criterion={criterion}/>
            </>
            )
        }
    }


    return (
        <div>
            <Header/>
            {handleLoan()}
        </div>
    )
}