import { useEffect, useState } from 'react';
import api from '../../services/api'

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
        }

        loadFilmes();

    },[])

    return (
        <div>
            <h1>
                Welcome to the home screen...
            </h1>
        </div>
    )
}

export default Home;