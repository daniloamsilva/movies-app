import { Movie } from "../../types/Movie"
import { Card, CardHeader } from "@ui5/webcomponents-react"

import styles from "./styles.module.scss"

type MovieCardProps = {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div data-test="movie-card">
      <Card
        className={styles.movie_card}
        key={movie.imdbId}
        onClick={() => window.location.href = `/movie/${movie.imdbId}`}
        style={{ cursor: 'pointer' }}
        header={
          <CardHeader
            titleText={movie.title.length > 20 ? `${movie.title.slice(0, 20)}...` : movie.title}
          />
        }
      >
        <img src={movie.poster} alt={movie.title} className={styles.poster} />
      </Card>
    </div>
  )
}