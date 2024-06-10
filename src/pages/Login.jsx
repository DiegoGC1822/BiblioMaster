import HashTable from '../dataEstructures/HashTable'
import { useNavigate } from 'react-router-dom'
import db from '../db.json'
import { useState } from 'react'
import { useUserContext } from '../contexts/userContext'
import styles from '../styles/Login.module.css'

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setActualUser } = useUserContext()
    const navigate = useNavigate()

    const users = new HashTable()
    db.users.forEach(user => {
        users.add(user.username, user)
    })

    const handleLogin = (e) => {
        e.preventDefault()
        const user = users.find(username,password)
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
            console.log('Login failed')
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