import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { useTransition } from 'react-spring';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchMovieAccountState, fetchTopRatedMovies } from '../../store/slices/movies';

import InfiniteLoading from '../../components/shared/InfiniteLoading';
import MovieActions from '../../components/layout/MovieActions';

import { Content } from '../../styles/Content';
import { Container, AnimatedLi, Movie } from './styles';
import { SectionTitle } from '../../styles/SectionTitle';

const TopRated: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const topRated = useAppSelector((state) => state.movies.topRated);
  const isFetching = useAppSelector((state) => state.movies.isFetching);
  const moviesWithTransition = useTransition(topRated.results, (movie) => movie.id, {
    from: { top: '50px', opacity: 0 },
    enter: { top: '0', opacity: 1 },
    leave: { top: '50px', opacity: 0 },
    trail: 200,
  });

  useEffect(() => {
    const page = 1;
    dispatch(fetchTopRatedMovies(page));
  }, []); // eslint-disable-line

  return (
    <Content headerOffset>
      <Container>
        <SectionTitle>Melhores Avaliados</SectionTitle>

        <ul>
          {moviesWithTransition.map(({ item: movie, key, props }, index) => (
            <AnimatedLi
              key={key}
              style={props}
              onMouseEnter={() =>
                dispatch(
                  fetchMovieAccountState({ movieId: movie.id, context: ' topRated' }),
                )
              }
            >
              <strong>{index + 1}</strong>

              <Movie
                onClick={() =>
                  history.push({
                    pathname: `movies/${movie.id}`,
                    state: { backdrop: movie.backdrop_path },
                  })
                }
              >
                <img
                  src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
                  alt={movie.title}
                />

                <div>
                  <h2>
                    {movie.title} <span>({movie.year})</span>
                  </h2>

                  <span>
                    <FiStar size={26} /> {movie.vote_average}
                  </span>

                  <MovieActions
                    movieId={movie.id}
                    isFavorite={movie.isFavorite}
                    isInWatchList={movie.isInWatchList}
                    context="topRated"
                  />
                </div>
              </Movie>
            </AnimatedLi>
          ))}
        </ul>

        <InfiniteLoading
          page={topRated.page}
          totalPages={topRated.total_pages}
          isLoading={isFetching}
          onPaginate={(page: number) => dispatch(fetchTopRatedMovies(page))}
        />
      </Container>
    </Content>
  );
};

export default TopRated;
