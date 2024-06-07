import { NavLink} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const NavBar = ({ icons }) => {
    return (
        <div>
           {icons.map((icon, index) => (
                <li key={index}>
                    <NavLink to={icon.to}>
                        <FontAwesomeIcon icon={icon.class} />
                        <span>{icon.name}</span>
                    </NavLink>
                </li>
            ))} 
        </div>
    )
}