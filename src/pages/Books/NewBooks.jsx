import { useUserContext } from "../../contexts/userContext"

export const NewBooks = () => {

    const { actualUser } = useUserContext()

    return (
        <div>
            <h1>NewBooks</h1>
            <h2>{actualUser.username}</h2>
        </div>
    )
}