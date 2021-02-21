import { useState } from 'react';
import { IMovie } from '../../../store';

import Carousel from '../../shared/Carousel';
import Movie, { ElementData } from '../Movie';

import { Container } from './styles';

interface MoviesCarouselProps {
  movieType?: 'poster' | 'backdrop';
  items?: number;
  data: IMovie[];
}

const MoviesCarousel: React.FC<MoviesCarouselProps> = ({
  data,
  movieType = 'backdrop',
  items = 5,
}) => {
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
      <Carousel
        items={items}
        responsive={[
          { breakpoint: 1366, items: 4 },
          { breakpoint: 768, items: 2 },
          { breakpoint: 640, items: 1 },
        ]}
      >
        {data.map((movie) => (
          <Carousel.Item key={movie.id}>
            <Movie
              key={movie.id}
              data={movie}
              type={movieType}
              // onMouseEnter={handleMovieMouseEnter}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default MoviesCarousel;
