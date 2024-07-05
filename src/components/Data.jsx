import { useUserContext } from "../contexts/userContext"
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
export const Data = () => {

    const { actualUser } = useUserContext();

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "87vh" }}>
            <Paper sx={{ padding: "2rem" }}>
                <Stack spacing={2}>
                    <Typography variant="h3" sx={{ textAlign: "center", fontFamily: "Roboto, sans-serif", borderBottom: "1px solid black" }}>
                        Datos del usuario
                    </Typography>
                    <h2>ID: {actualUser.id}</h2>
                    <h2>USERNAME: {actualUser.username}</h2>
                    <h2>PASSWORD: {actualUser.password}</h2>
                    <h2>ROLE: {actualUser.role}</h2>
                </Stack>
            </Paper>
        </div>
    )
}