import { useState } from 'react';
import { IMovie } from '../../../store';

import Carousel from '../../shared/Carousel';
import Movie, { ElementData } from '../Movie';

import { Container } from './styles';

interface MoviesCarouselProps {
  data: IMovie[];
}

const MoviesCarousel: React.FC<MoviesCarouselProps> = ({ data }) => {
  const [currentMovieData, setCurrentMovieData] = useState<IMovie | null>(null);
  const [currentMovieStyles, setCurrentMovieStyles] = useState({
    position: 'absolute',
    zIndex: '1',
  });

  const handleMovieMouseEnter = ({ movieData, ...styles }: ElementData) => {
    setCurrentMovieData(movieData);
    setCurrentMovieStyles({ ...currentMovieStyles, ...styles });
  };

  const handleMovieMouseLeave = () => {
    setCurrentMovieData(null);
  };

  return (
    <Container>
      {!!currentMovieData && (
        <Movie
          type="backdrop"
          data={currentMovieData || ({} as IMovie)}
          style={currentMovieStyles}
          onMouseLeave={handleMovieMouseLeave}
        />
      )}
      <Carousel items={5} perPage>
        {data.map((movie) => (
          <Carousel.Item key={movie.id}>
            <Movie
              key={movie.id}
              data={movie}
              type="backdrop"
              onMouseEnter={handleMovieMouseEnter}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default MoviesCarousel;
