import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/api';

function Filme(){
    const { id } = useParams();

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "b5598d298b1080f63e71b57690a0bb28", 
                    language: "pt-BR",
                }
            }).then((response)=>{
                console.log(response)
            })
            .catch(()=>{
                
            })
        }

        loadFilme();
    })

    return (
        <div>
            <h1>
                Welcome to the film screen.
            </h1>
        </div>
    )
}

export default Filme;
