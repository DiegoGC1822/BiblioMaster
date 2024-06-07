import { Login } from "./pages/Login.jsx"
import { Books } from "./pages/Books/Books.jsx"

export const routes = [
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/newbooks",
        element: <Books/>
    },
    {
        path: "/editbooks",
        element: <Books/>
    }
]