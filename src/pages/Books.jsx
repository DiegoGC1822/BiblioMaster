import { useLocation } from "react-router-dom"
import { NewBooks } from "../components/NewBooks.jsx"
import { EditBooks } from "../components/EditBooks.jsx"
import { Header } from "../components/Header.jsx"

export const Books = () => {

    const location = useLocation()

    const handleBooks = () => {
        if(location.pathname === '/newbooks') {
            return <NewBooks/>
        }else{
            return <EditBooks/>
        }
    }

    return (
        <>
            <Header/>
            {handleBooks()}
        </>
    )
}