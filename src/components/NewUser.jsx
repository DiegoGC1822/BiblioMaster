import { useState } from "react"
import { useUsersContext } from "../contexts/usersContext"

export const NewUser = () => {

    const {users, setUsers} = useUsersContext()

    const [formState,setFormState] = useState({
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
        
        setFormState((prevFormState) => ({
            ...prevFormState,
            id: users.length + 1
        }))

        setUsers((prevUsers) => ([
            ...prevUsers,
            formState
        ]))

        setFormState({
            username: "",
            password: "",
            role: ""
        })
    }  

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nombre:</label>
                    <input
                    type="text"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Email:</label>
                    <input
                    type="text"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="role">Rol:</label>
                    <select htmlFor="role" name="role" value={formState.role} onChange={handleChange}>
                        <option value="">Selecciona un rol</option>
                        <option value="Administrator">Administrador</option>
                        <option value="Estudent">Estudiante</option>
                    </select>
                </div>
                <button type="submit">Enviar</button>
            </form>   
        </div>
    )
}