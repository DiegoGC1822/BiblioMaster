import { AppRouter } from './Router' 
import { BrowserRouter as Router} from 'react-router-dom'
import { UserContextProvider } from './contexts/userContext'
import { LoansContextProvider } from './contexts/loansContext'
import { BooksContextProvider } from './contexts/booksContext'

function App() {

    return (
        <BooksContextProvider>
            <LoansContextProvider>
                <UserContextProvider>
                    <Router>
                        <AppRouter />
                    </Router>
                </UserContextProvider>
            </LoansContextProvider>
        </BooksContextProvider>
    )

}

export default App
