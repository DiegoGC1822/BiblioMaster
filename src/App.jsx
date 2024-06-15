import { AppRouter } from './Router' 
import { BrowserRouter as Router} from 'react-router-dom'
import { UserContextProvider } from './contexts/userContext'
import { LoansContextProvider } from './contexts/loansContext'
import { BooksContextProvider } from './contexts/booksContext'
import { UsersContextProvider } from './contexts/usersContext'

function App() {

    return (
        <UsersContextProvider>
            <BooksContextProvider>
                <LoansContextProvider>
                    <UserContextProvider>
                        <Router>
                            <AppRouter />
                        </Router>
                    </UserContextProvider>
                </LoansContextProvider>
            </BooksContextProvider>
        </UsersContextProvider>
    )

}

export default App
