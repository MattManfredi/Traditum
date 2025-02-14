import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/prestadores">Prestadores</Link></li>
                <li><Link to="/planes">Planes</Link></li>
                <li><Link to="/practicas">Prácticas</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
