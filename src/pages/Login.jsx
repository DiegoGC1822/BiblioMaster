import HashTable from '../dataEstructures/HashTable'
import { useNavigate } from 'react-router-dom'
import db from '../db.json'
import { useState } from 'react'
import { useUserContext } from '../contexts/userContext'

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
            navigate('/newbooks')
        } else {
            console.log('Login failed')
        }
        console.log(users)
    }

    return (
        <div>
            <h1>BIBLIOMASTER</h1>
            <form onSubmit={handleLogin}>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                <button>Entrar</button>
            </form>
        </div>
    )
}