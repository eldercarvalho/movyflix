import { useMemo, MouseEvent, useRef, useCallback } from 'react';
import { FiStar } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { IMovie, Store } from '../../store';

import { Container, MovieDetails } from './styles';

interface MovieProps {
  type?: 'poster' | 'backdrop';
  data: IMovie;
}

const Movie: React.FC<MovieProps> = ({ type = 'poster', data }) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const containerCloneRef = useRef<HTMLAnchorElement>();
  const timeoutRef = useRef(0);
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

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (containerRef.current) containerRef.current.style.visibility = 'initial';
      if (containerCloneRef.current) document.body.removeChild(containerCloneRef.current);
    }, 300);
  }, []);

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    if (type === 'poster') return;

    const container = event.currentTarget;
    containerCloneRef.current = (containerRef.current?.cloneNode(true) ||
      document.createElement('a')) as HTMLAnchorElement;
    const width = container.offsetWidth;
    const top = container.getBoundingClientRect().top + window.scrollY;
    const left = container.getBoundingClientRect().left + window.scrollX;

    if (containerRef.current) containerRef.current.style.visibility = 'hidden';
    containerCloneRef.current.style.position = 'absolute';
    containerCloneRef.current.style.width = `${width}px`;
    containerCloneRef.current.style.top = `${top}px`;
    containerCloneRef.current.style.left = `${left}px`;
    containerCloneRef.current.onmouseleave = handleMouseLeave;

    document.body.appendChild(containerCloneRef.current);
  };

  return (
    <Container
      ref={containerRef}
      to={`/movies/${data.id}`}
      type={type}
      onMouseEnter={handleMouseEnter}
    >
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
