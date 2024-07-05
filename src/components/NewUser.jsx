import { useState } from "react"
import { useUsersContext } from "../contexts/usersContext"
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export const NewUser = () => {

    const {users, setUsers} = useUsersContext()

    const [formState,setFormState] = useState({
        id: 0,
        username: "",
        password: "",
        role: ""
    })    

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState((prevFormState) => ({
          ...prevFormState,
          [name]: value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        for (let key in formState) {
          if (formState[key] === '') {
            alert(`El campo ${key} está vacío`);
            return
          }
        }
        
        const newUser = {
            ...formState,
            id: users.length + 1
        };

        setUsers((prevUsers) => ([
            ...prevUsers,
            newUser
        ]))

        setFormState({
            id: 0,
            username: "",
            password: "",
            role: ""
        })
    }  

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "87vh"}}>
            <Paper sx={{padding: "2rem"}}>
                <Typography variant="h3" sx={{textAlign: "center", fontFamily: "Roboto, sans-serif"}}>
                    Nuevo usuario
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Usuario"
                            name="username"
                            value={formState.username}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Contraseña"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            required
                        />
                        <FormControl>
                            <Select
                                labelId="role"
                                id="role"
                                name="role"
                                value={formState.role}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Estudent">Estudiante</MenuItem>
                                <MenuItem value="Administrator">Administrador</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained">Agregar</Button>
                    </Stack>
                </form>   
            </Paper>
        </div>
    )
}