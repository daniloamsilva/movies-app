import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { addFavorite, removeFavorite } from "../../redux/features/favorite-slice";
import { getMovie } from '../../redux/features/movie-slice';

import styles from './styles.module.scss';
import { Button, ResponsiveGridLayout, Text, Title, ToggleButton } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/favorite.js";
import "@ui5/webcomponents-icons/dist/unfavorite.js";

export function Movie() {
  const { imdbID } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { moviesImdbIds } = useAppSelector((state) => state.favoriteReducer);
  const { movie } = useAppSelector((state) => state.movieReducer);
  const isFavorite = moviesImdbIds.includes(imdbID);

  const handleGetMovie = useCallback(async () => {
    await dispatch(getMovie(imdbID));
  }, [dispatch, imdbID])

  useEffect(() => {
    void handleGetMovie();
  }, [handleGetMovie]);

  const handleFavorite = (toggle: boolean) => {
    toggle
      ? dispatch(addFavorite(movie.imdbId))
      : dispatch(removeFavorite(movie.imdbId))
  }

  return (
    <section className={styles.details_wrapper} data-test="movie-details-page">
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
              <img src={movie.poster || "/no-image.png"} alt={movie.title} data-test="movie-poster" />
            </div>
            <div className={styles.details} data-test="movie-details">
              <Title>{movie.title}</Title>
              <Text><strong data-test="movie-detail-item">Sinopse:</strong> {movie.plot}</Text>
              <Text><strong data-test="movie-detail-item">Elenco:</strong> {movie.actors.join(", ")}</Text>
              <Text><strong data-test="movie-detail-item">Diretor:</strong> {movie.director}</Text>
              <Text><strong data-test="movie-detail-item">Gêneros:</strong> {movie.genres.join(", ")}</Text>
              <Text><strong data-test="movie-detail-item">Lançamento:</strong> {movie.released}</Text>
              <Text><strong data-test="movie-detail-item">Availação:</strong> {movie.rating}</Text>
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