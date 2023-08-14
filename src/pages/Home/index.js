import { useEffect, useState } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

function Home(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "b5598d298b1080f63e71b57690a0bb28",
                    language: "pt-BR",
                    page: 1
                }
            })

            console.log(response);
            setFilmes(response.data.results.slice(0, 10))
        }

        loadFilmes();

    },[])

    return (
        <div className="container">
           <div className="lista-filmes">
            {filmes.map( (filme) => {
                return(
                    <article key={filme.id}>
                        <strong>{filme.title} </strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                    </article>
                )
            })}
           </div>
        </div>
    )
}

export default Home;