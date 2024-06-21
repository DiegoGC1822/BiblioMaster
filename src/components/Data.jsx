import { useUserContext } from "../contexts/userContext"
export const Data = () => {

    const { actualUser } = useUserContext();

    return (
        <div>
            <h2>ID: {actualUser.id}</h2>
            <h2>USERNAME: {actualUser.username}</h2>
            <h2>PASSWORD: {actualUser.password}</h2>
            <h2>ROLE: {actualUser.role}</h2>
        </div>
    )
}