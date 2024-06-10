import { NavLink} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation } from "react-router-dom"
import styles  from "../styles/Header.module.css"

export const NavBar = ({ icons }) => {

    const location = useLocation()

    return (
        <ul className={styles.navbar}>
           {icons.map((icon, index) => (
                <li key={index}>
                    <NavLink to={icon.to[0]} className={icon.to.includes(location.pathname) ? styles.active : ""}>
                        <FontAwesomeIcon icon={icon.class} />
                        <span>{icon.name}</span>
                    </NavLink>
                </li>
            ))} 
        </ul>
    )
}