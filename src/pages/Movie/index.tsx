import { useParams } from 'react-router-dom';

export function Movie() {
  const { imdbID } = useParams();

  return <h1>MoviePage: {imdbID}</h1>;
}