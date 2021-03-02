import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import {
  fetchConfigs,
  fetchGenres,
  fetchNowPlayngMovies,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../../store/slices/movies';

import Banners from '../../components/layout/Banners';
import MoviesGrid from '../../components/layout/MoviesGrid';
import MoviesCarousel from '../../components/layout/MoviesCarousel';

import { Content } from '../../styles/Content';
import { SectionTitle } from '../../styles/SectionTitle';
import { Container, Section } from './styles';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { popular, nowPlaying, upcoming } = useAppSelector((state) => state.movies);

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
          <SectionTitle>Popular</SectionTitle>

          <MoviesGrid horizontalOnMobile data={popular.results.slice(0, 16)} />
        </Section>

        <Section>
          <SectionTitle>Em Cartaz</SectionTitle>

          <MoviesCarousel data={nowPlaying.results} />
        </Section>

        <Section>
          <SectionTitle>Próximas Estréias</SectionTitle>

          <MoviesCarousel data={upcoming.results} />
        </Section>
      </Content>
    </Container>
  );
};

export default Home;
