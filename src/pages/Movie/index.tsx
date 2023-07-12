import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { addFavorite, removeFavorite } from "../../redux/features/favorite-slice";

import styles from './styles.module.scss';
import { Button, ResponsiveGridLayout, Text, Title, ToggleButton } from '@ui5/webcomponents-react';
import { SearchMovieResponse } from '../../types/SearchMovieResponse';
import "@ui5/webcomponents-icons/dist/favorite.js";
import "@ui5/webcomponents-icons/dist/unfavorite.js";

export function Movie() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<SearchMovieResponse | null>(null)

  const dispatch = useDispatch<AppDispatch>();
  const { moviesImdbIds } = useAppSelector((state) => state.favoriteReducer);
  const isFavorite = moviesImdbIds.includes(imdbID);

  useEffect(() => {
    fetch(`http://localhost:3333/movies/${imdbID}`)
      .then(response => response.json() as unknown as SearchMovieResponse)
      .then(data => setMovie(data))
      .catch(() => {
        console.log("Erro ao buscar filme");
      });
  }, [imdbID]);

  const handleFavorite = (toggle: boolean) => {
    toggle
      ? dispatch(addFavorite(movie.imdbId))
      : dispatch(removeFavorite(movie.imdbId))
  }

  return (
    <section className={styles.details_wrapper} data-test="movie-details">
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
              <ToggleButton
                icon={isFavorite ? "favorite" : "unfavorite"}
                pressed={isFavorite}
                onClick={() => handleFavorite(!isFavorite)}
              >
                {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              </ToggleButton>
            </div>
          </ResponsiveGridLayout>

        </>
      )}
    </section>
  );
}