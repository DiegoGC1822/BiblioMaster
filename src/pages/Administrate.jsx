import { Header } from "../components/Header"
import { ChangePassword } from "../components/ChangePassword"
import { Data } from "../components/Data"
import { useLocation } from "react-router-dom"

export const Administrate = () => {

    const location = useLocation()

    const handleAdministrator = () => {
        if(location.pathname === '/changepassword') {
            return <ChangePassword/>
        }else{
            return <Data/>
        }
    }

    return (
        <div>
            <Header/>
            {handleAdministrator()}
        </div>
    )
}