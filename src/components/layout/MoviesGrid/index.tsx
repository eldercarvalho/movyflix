import { IMovie } from '../../../store';

import Movie from '../Movie';

import { Container } from './styles';

interface MoviesGridProps {
  data: IMovie[];
}

const MoviesGrid: React.FC<MoviesGridProps> = ({ data }) => {
  return (
    <Container>
      {data.map((movie) => (
        <Movie key={movie.id} data={movie} />
      ))}
    </Container>
  );
};

export default MoviesGrid;
