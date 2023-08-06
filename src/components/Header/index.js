import './header.css';
import { Link } from 'react-router-dom'

function Header(){
    return(
        <header>
            <Link className="Logo" to="/">Primme Flix</Link>
            <Link className="Favoritos" to="/favoritos">Meus filmes</Link>
        </header>
    )
}

export default Header;