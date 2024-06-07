import { AppRouter } from './Router' 
import { BrowserRouter as Router} from 'react-router-dom'
import { UserContextProvider } from './contexts/userContext'

function App() {

    return (
        <UserContextProvider>
            <Router>
                <AppRouter />
            </Router>
        </UserContextProvider>
    )

}

export default App
