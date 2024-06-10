import { Header } from "../components/Header";
import { NewUser } from "../components/NewUser";
import { EditUser } from "../components/EditUser";
import { useLocation } from "react-router-dom";

export const Users = () => {

    const location = useLocation()

    const handleUsers = () => {
        if(location.pathname === '/newuser') {
            return <NewUser/>
        }else{
            return <EditUser/>
        }
    }

    return (
        <div>
            <Header/>
            {handleUsers()}
        </div>
    )
}