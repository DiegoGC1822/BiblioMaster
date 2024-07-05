import { Login } from "./pages/Login.jsx"
import { Books } from "./pages/Books.jsx"
import { Administrate } from "./pages/Administrate.jsx"
import { Users } from "./pages/Users.jsx"
import { Returns } from "./pages/Returns.jsx"
import { Loan } from "./pages/Loan.jsx"
import { BooksStudent } from "./pages/BooksStudent.jsx"

export const routes = [
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/newbook",
        element: <Books/>
    },
    {
        path: "/editbook",
        element: <Books/>
    },
    {
        path: "/data",
        element: <Administrate/>
    },
    {
        path: "/newuser",
        element: <Users/>
    },
    {
        path: "/edituser",
        element: <Users/>
    },
    {
        path: "/returns",
        element: <Returns/>
    },
    {
        path: "/pending",
        element: <Loan/>
    },
    {
        path: "/renovateLoan",
        element: <Loan/>
    },
    {
        path: "/bookloan",
        element: <BooksStudent/>
    },
    {
        path: "/renovation",
        element: <BooksStudent/>
    },
    {
        path: "/request",
        element: <BooksStudent/>
    }
]