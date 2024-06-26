import icons from "../icons.json"
import { NavBar } from "./NavBar"
import { useLocation } from "react-router-dom"
import { useUserContext } from "../contexts/userContext"
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Agrega todos los íconos sólidos a la biblioteca
library.add(fas);

export const Header = () => {
    
    const { actualUser } = useUserContext()
    const location = useLocation()
    const iconsRole = actualUser.role === "Administrator" ? icons.Administrator : icons.Estudent
    const pIcons = iconsRole ? iconsRole : []
    const currentIcon = pIcons.find(icon => icon.to.includes(location.pathname))
    const sIcons = currentIcon && currentIcon.subIcons ? currentIcon.subIcons : []

    return (
        <div>
            <NavBar icons={pIcons} />
            <NavBar icons={sIcons} />
        </div>
    )
}