import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchConfigs, fetchGenres, fetchTrendingMovies, Store } from '../../store';

import Banners from '../../components/Banners';

import { Container, Content, Grid } from './styles';
import { SectionTitle } from '../../styles/SectionTitle';
import Button from '../../components/Button';
import Movie from '../../components/Movie';
// import Carousel from '../../components/Carousel';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: Store) => state.movies.trendingMovies.slice(0, 10));

  useEffect(() => {
    dispatch(fetchConfigs());
    dispatch(fetchGenres());
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  return (
    <Container>
      <Banners />

      <Content>
        <SectionTitle>Popular Movies</SectionTitle>

        <Grid>
          {movies.map((movie) => (
            <Movie key={movie.id} data={movie} />
          ))}
        </Grid>

        <div className="text-center">
          <Button>More</Button>
        </div>

        <SectionTitle>Popular</SectionTitle>
      </Content>
    </Container>
  );
};

export default Home;
