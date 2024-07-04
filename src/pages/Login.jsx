import HashTable from '../dataEstructures/HashTable'
import { useNavigate } from 'react-router-dom'
import { useUsersContext } from '../contexts/usersContext'
import { useState } from 'react'
import { useUserContext } from '../contexts/userContext'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import background from '../assets/background.jpg'
import Box from '@mui/material/Box'

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
        <Box 
            sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                backgroundImage: `url(${background})`, 
                backgroundPosition: 'center', 
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                margin: 0,
                padding: 0,
                width: '100vw'
            }}
        >
            <Paper 
                sx ={{ 
                    padding: '30px', 
                    borderRadius: '10px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
            >
                <Typography variant="h3" component="h1" sx={{fontFamily: 'cursive'}}>BIBLIOMASTER</Typography>
                <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', width: '100%'}}>
                    <TextField label="Usuario" type="text" onChange={e => setUsername(e.target.value)}/>
                    <TextField label="Contraseña" type="password" onChange={e => setPassword(e.target.value)}/>
                    <Button variant="contained" type="submit">Entrar</Button>
                </form>
            </Paper>
        </Box>
    )
}