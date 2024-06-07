import HashTable from '../dataEstructures/HashTable'
import { useNavigate } from 'react-router-dom'
import db from '../db.json'
import { useState } from 'react'

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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
                <input type="text" onChange={e => setPassword(e.target.value)}/>
                <button>Entrar</button>
            </form>
        </div>
    )
}