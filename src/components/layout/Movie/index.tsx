import { useMemo, MouseEvent, useRef, useCallback, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useAppSelector } from '../../../hooks';
import useParentRoutePath from '../../../hooks/parentRoutePath';
import { IMovie } from '../../../store/slices/movies';

import { Container, MovieImage, MovieInfo } from './styles';

export interface ElementData {
  width: string;
  top: string;
  left: string;
  movieData: IMovie;
}
interface MovieProps {
  type?: 'poster' | 'backdrop';
  data: IMovie;
  style?: Record<string, string>;
  onMouseEnter?(elementData: ElementData): void;
  onMouseLeave?(): void;
}

const Movie: React.FC<MovieProps> = ({
  type = 'poster',
  data,
  style,
  onMouseEnter,
  onMouseLeave,
}) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const containerCloneRef = useRef<HTMLAnchorElement>();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const timeoutRef = useRef(0);
  const genres = useAppSelector((state) => state.movies.genres);
  const imagePath = type === 'poster' ? data.poster_path : data.backdrop_path;
  const isPoster = type === 'poster';
  const parentRoutePath = useParentRoutePath();
  const movieGenres = useMemo(
    () =>
      genres
        .filter((genre) => data.genre_ids?.includes(genre.id))
        .map((genre) => genre.name)
        .slice(0, 1)
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

  const handlecloneClick = useCallback((event) => {
    event.preventDefault();
    if (containerRef.current) containerRef.current.style.visibility = 'initial';
    if (containerCloneRef.current) document.body.removeChild(containerCloneRef.current);
    containerRef.current?.click();
  }, []);

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    const container = event.currentTarget;
    containerCloneRef.current = (containerRef.current?.cloneNode(true) ||
      document.createElement('a')) as HTMLAnchorElement;
    const width = `${container.offsetWidth}px`;
    const top = '0';
    const left = `${container.getBoundingClientRect().left - 60}px`;

    // if (containerRef.current) containerRef.current.style.visibility = 'hidden';
    // containerCloneRef.current.style.position = 'absolute';
    // containerCloneRef.current.style.width = `${width}px`;
    // containerCloneRef.current.style.top = `${top}px`;
    // containerCloneRef.current.style.left = `${left}px`;
    // containerCloneRef.current.onmouseleave = handleMouseLeave;
    // containerCloneRef.current.onclick = handlecloneClick;

    // document.body.appendChild(containerCloneRef.current);
    if (onMouseEnter) onMouseEnter({ width, top, left, movieData: data });
  };

  return (
    <Container
      ref={containerRef}
      to={{
        pathname: `/movies/${data.id}`,
        state: { backdrop: data.backdrop_path, from: parentRoutePath },
      }}
      type={type}
      style={style}
      onMouseEnter={type === 'backdrop' ? handleMouseEnter : undefined}
      onMouseLeave={type === 'backdrop' ? onMouseLeave : undefined}
    >
      <MovieImage type={type}>
        <img
          style={!isImageLoaded && isPoster ? { display: 'none' } : { display: 'block' }}
          src={`https://image.tmdb.org/t/p/w500/${imagePath}`}
          alt={data.title}
          onLoad={() => setIsImageLoaded(true)}
        />
      </MovieImage>

      <MovieInfo type={type}>
        <strong>{data.title}</strong>
        <div>
          <span>
            <FiStar size={18} /> {data.vote_average}
          </span>
          <span>{movieGenres}</span>
        </div>
      </MovieInfo>
    </Container>
  );
};

export default Movie;
