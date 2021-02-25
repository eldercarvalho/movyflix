import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiStar } from 'react-icons/fi';
import { useTransition } from 'react-spring';

import { useHistory } from 'react-router-dom';
import { Store, fetchTopRatedMovies } from '../../store';

import InfiniteLoading from '../../components/shared/InfiniteLoading';
import MovieActions from '../../components/layout/MovieActions';

import { Content } from '../../styles/Content';
import { Container, AnimatedLi, Movie } from './styles';
import { SectionTitle } from '../../styles/SectionTitle';

const TopRated: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { topRated, isFetching } = useSelector((store: Store) => store.movies);
  const moviesWithTransition = useTransition(topRated.results, (movie) => movie.id, {
    from: { top: '50px', opacity: 0 },
    enter: { top: '0', opacity: 1 },
    leave: { top: '50px', opacity: 0 },
    trail: 300,
  });

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  return (
    <Content headerOffset>
      <Container>
        <SectionTitle>Melhores Avaliados</SectionTitle>

        <ul>
          {moviesWithTransition.map(({ item: movie, key, props }, index) => (
            <AnimatedLi key={key} style={props}>
              <strong>{index + 1}</strong>

              <Movie onClick={() => history.push(`movies/${movie.id}`)}>
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

                  <MovieActions />
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
