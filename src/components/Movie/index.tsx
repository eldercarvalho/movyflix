import { useMemo } from 'react';
import { FiStar } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { IMovie, Store } from '../../store';

import { Container, MovieDetails } from './styles';

interface MovieProps {
  type?: 'poster' | 'backdrop';
  data: IMovie;
}

const Movie: React.FC<MovieProps> = ({ type = 'poster', data }) => {
  const genres = useSelector((store: Store) => store.movies.genres);
  const imagePath = type === 'poster' ? data.poster_path : data.backdrop_path;
  const movieGenres = useMemo(
    () =>
      genres
        .filter((genre) => data.genre_ids?.includes(genre.id))
        .map((genre) => genre.name)
        .slice(0, 2)
        .join(','),
    [data.genre_ids, genres],
  );

  return (
    <Container to={`/movies/${data.id}`}>
      <img src={`https://image.tmdb.org/t/p/w300/${imagePath}`} alt={data.title} />
      <div>
        <strong>{data.title}</strong>
        <MovieDetails>
          <span>
            <FiStar size={18} /> {data.vote_average}
          </span>
          <span>{movieGenres}</span>
        </MovieDetails>
      </div>
    </Container>
  );
};

export default Movie;
