import { useEffect, useState } from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom'

function Favoritos(){
    const [Filmes, setFilmes] = useState([])

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@primeflixx");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    return(
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            <ul>
                {Filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;