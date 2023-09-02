import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadFilmes = async (pageNum) => {
    try {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "b5598d298b1080f63e71b57690a0bb28",
          language: "pt-BR",
          page: pageNum,
        },
      });

      const newFilmes = response.data.results;

      // Append the new films to the existing list
      setFilmes((prevFilmes) => [...prevFilmes, ...newFilmes]);

      if (newFilmes.length === 0) {
        // No more films available
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading films:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadFilmes(1);
  }, []);

  const fetchMoreData = () => {
    setPage(page + 1);
    loadFilmes(page + 1);
  };

  if (loading) {
    return (
      <div className='loading'>
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={filmes.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="lista-filmes">
          {filmes.map((filme) => {
            return (
              <article key={filme.id}>
                <div className='title'><strong>{filme.title} </strong></div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                  alt={filme.title}
                />
                <Link to={`/filme/${filme.id}`}>Access</Link>
              </article>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Home;
