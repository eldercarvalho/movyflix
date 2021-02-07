import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchConfigs, fetchGenres, fetchTrendingMovies } from '../../store';

import Banners from '../../components/Banners';

import { Container } from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConfigs());
    dispatch(fetchGenres());
    dispatch(fetchTrendingMovies());
  }, []);

  return (
    <Container>
      <Banners />
    </Container>
  );
};

export default Home;
