import { Login } from "./pages/Login.jsx"
import { NewBooks } from "./pages/NewBooks.jsx"
import { EditBooks } from "./pages/EditBooks.jsx"

export const routes = [
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/newbooks",
        element: <NewBooks/>
    },
    {
        path: "/editbooks",
        element: <EditBooks/>
    }
]