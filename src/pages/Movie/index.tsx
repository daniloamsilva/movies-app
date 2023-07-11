import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';
import { Button, ResponsiveGridLayout, Text, Title } from '@ui5/webcomponents-react';
import { SearchMovieResponse } from '../../types/SearchMovieResponse';

export function Movie() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<SearchMovieResponse | null>(null)

  useEffect(() => {
    fetch(`http://localhost:3333/movies/${imdbID}`)
      .then(response => response.json() as unknown as SearchMovieResponse)
      .then(data => setMovie(data))
      .catch(() => {
        console.log("Erro ao buscar filme");
      });
  }, [imdbID]);

  return (
    <section className={styles.details_wrapper}>
      {!movie && <p>Carregando...</p>}
      {movie && (
        <>
          <Button
            onClick={() => window.location.pathname = "/"}
            icon="navigation-left-arrow"
          >
            Voltar
          </Button>

          <ResponsiveGridLayout
            className={styles.details_container}
            columnsXL={2}
            columnsL={2}
            columnsM={1}
            columnsS={1}
          >
            <div className={styles.poster_wrapper}>
              <img src={movie.poster || "/no-image.png"} alt={movie.title} />
            </div>
            <div className={styles.details}>
              <Title>{movie.title}</Title>
              <Text><strong>Sinopse:</strong> {movie.plot}</Text>
              <Text><strong>Elenco:</strong> {movie.actors.join(", ")}</Text>
              <Text><strong>Diretor:</strong> {movie.director}</Text>
              <Text><strong>Gêneros:</strong> {movie.genres.join(", ")}</Text>
              <Text><strong>Lançamento:</strong> {movie.released}</Text>
              <Text><strong>Availação:</strong> {movie.rating}</Text>
            </div>
          </ResponsiveGridLayout>

        </>
      )}
    </section>
  );
}