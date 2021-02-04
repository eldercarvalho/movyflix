import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchGenres } from '../../store';

import Banners from '../../components/Banners';

import { Container } from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  return (
    <Container>
      <Banners />
    </Container>
  );
};

export default Home;
