import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css';
import api from '../../services/api';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "b5598d298b1080f63e71b57690a0bb28", 
                    language: "pt-BR",
                }
            }).then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado");
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado")
        }

    }, [navigate, id])

    function salvaFilme(){
        const minhaLista = localStorage.getItem("@primeflixx");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id )

        if(hasFilme){
            alert("Esse filme já etsá na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflixx", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso")
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>
               {filme.title}
            </h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.votre_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvaFilme}>Salvar</button>
                <button>
                    <a target="blank"  rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;
