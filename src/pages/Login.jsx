import HashTable from '../dataEstructures/HashTable'
import { useNavigate } from 'react-router-dom'
import { useUsersContext } from '../contexts/usersContext'
import { useState } from 'react'
import { useUserContext } from '../contexts/userContext'
import styles from '../styles/Login.module.css'

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setActualUser } = useUserContext()
    const { users } = useUsersContext()
    const navigate = useNavigate()

    const THusers = new HashTable()
    users.forEach(user => {
        THusers.add(user.username, user)
    })

    const handleLogin = (e) => {
        e.preventDefault()
        const user = THusers.find(username,password)
        if (user && user.value.password === password) {
            console.log('Login successful')
            setActualUser(user.value)
            if(user.value.role === 'Administrator'){
                navigate('/newbook')
                console.log(user)
            } else {
                navigate('/bookloan')
                console.log(user)
            }
        } else {
            alert("Usuario o contraseña incorrecta")
        }
        console.log(users)
    }

    return (
        <div className={styles.login}>
            <div style ={{backgroundColor: '#DCD7D7', padding: '30px', borderRadius: '10px'}}>
            <h1>BIBLIOMASTER</h1>
            <form onSubmit={handleLogin}>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                <button>Entrar</button>
            </form>
            </div>
        </div>
    )
}