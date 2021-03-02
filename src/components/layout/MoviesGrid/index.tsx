import { IMovie } from '../../../store/slices/movies';

import Movie from '../Movie';

import { Container } from './styles';

interface MoviesGridProps {
  horizontalOnMobile?: boolean;
  data: IMovie[];
}

const MoviesGrid: React.FC<MoviesGridProps> = ({ data, horizontalOnMobile = false }) => {
  return (
    <Container horizontalOnMobile={horizontalOnMobile}>
      {data.map((movie) => (
        <Movie key={movie.id} data={movie} />
      ))}
    </Container>
  );
};

export default MoviesGrid;
