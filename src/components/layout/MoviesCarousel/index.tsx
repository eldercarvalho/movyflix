import { IMovie } from '../../../store';

import Carousel from '../../shared/Carousel';
import Movie from '../Movie';

import { Container } from './styles';

interface MoviesCarouselProps {
  data: IMovie[];
}

const MoviesCarousel: React.FC<MoviesCarouselProps> = ({ data }) => {
  return (
    <Container>
      <Carousel items={5} perPage>
        {data.map((movie) => (
          <Carousel.Item key={movie.id}>
            <Movie key={movie.id} data={movie} type="backdrop" />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default MoviesCarousel;
