/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { setCurrentSearch, reset } from "../../redux/features/search-slice";
import { Button, Input, ResponsiveGridLayout, Title } from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"

import styles from "./styles.module.scss";

import { MovieHeaderList } from "../../components/MovieHeaderList";
import { MovieCard } from "../../components/MovieCard";

export function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { currentSearch, movies, page } = useAppSelector((state) => state.searchReducer);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string | undefined>(currentSearch);

  const handleSubmitSearchForm = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await dispatch(setCurrentSearch(search));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, [search, dispatch]);

  const handleResetButton = useCallback(() => {
    setSearch("");
    dispatch(reset());
  }, [dispatch]);

  return (
    <>
      <div className={styles.search_container}>
        <form onSubmit={handleSubmitSearchForm}>
          <label>O que você quer assistir hoje?</label>
          <div data-test="search-container">
            <Input
              className={styles.input_search}
              placeholder="Digite o nome do filme"
              disabled={loading}
              value={search}
              onInput={(event) => setSearch(event.target.value)}
            />
            <Button
              type="Submit"
              icon="search"
              disabled={loading || search.length === 0}
            />
            <Button type="Button" onClick={handleResetButton}>Reset</Button>
          </div>
        </form>
      </div>
      <div>
        {!loading && movies.length > 0 && (
          <div className={styles.movies_list}>
            <MovieHeaderList handleSetLoading={setLoading} />
            <ResponsiveGridLayout
              columnsXL={5}
              columnsL={5}
              columnsM={3}
              columnsS={1}
              rowGap='1rem'
            >
              {!loading && movies.length > 0 && movies.map(movie => (
                <MovieCard key={movie.imdbId} movie={movie} />
              ))}
            </ResponsiveGridLayout>
          </div>
        )}
        {loading && <Title>Procurando...</Title>}
        {page === 0 && !loading && <Title>Busque por um filme</Title>}
        {movies.length === 0 && !loading && page > 0 && <Title>Nenhum filme encontrado</Title>}
      </div>
    </>
  )
}