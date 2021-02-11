import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchConfigs,
  fetchGenres,
  fetchNowPlayngMovies,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  Store,
} from '../../store';

import Banners from '../../components/layout/Banners';
import Button from '../../components/shared/Button';
import MoviesCarousel from '../../components/layout/MoviesCarousel';
import Movie from '../../components/layout/Movie';

import { SectionTitle } from '../../styles/SectionTitle';
import { Container, Content, Section, Grid } from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { popular, nowPlaying, upcoming } = useSelector((store: Store) => store.movies);

  useEffect(() => {
    dispatch(fetchConfigs());
    dispatch(fetchGenres());
    dispatch(fetchTrendingMovies());
    dispatch(fetchPopularMovies());
    dispatch(fetchNowPlayngMovies());
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  return (
    <Container>
      <Banners />

      <Content>
        <Section>
          <SectionTitle>Popular Movies</SectionTitle>

          <Grid>
            {popular.results.slice(0, 14).map((movie) => (
              <Movie key={movie.id} data={movie} />
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Now Playing</SectionTitle>

          <MoviesCarousel data={nowPlaying.results} />
        </Section>

        <Section>
          <SectionTitle>Upcoming</SectionTitle>

          <MoviesCarousel data={upcoming.results} />
        </Section>
      </Content>
    </Container>
  );
};

export default Home;
