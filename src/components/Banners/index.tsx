import { useSelector } from 'react-redux';

import { Store } from '../../store';

import Button from '../Button';
import Carousel from '../Carousel';

import { Container, BannerItem, BannerInfo } from './styles';

const Banners: React.FC = () => {
  const { movies } = useSelector((state: Store) => {
    return {
      movies: state.movies.trendingMovies,
    };
  });

  return (
    <Container>
      <Carousel dotNumber>
        {movies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <BannerItem>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
              />

              <BannerInfo>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <div>
                  <Button>More details</Button>
                  <span>{movie.formatted_relese_date}</span>
                </div>
              </BannerInfo>
            </BannerItem>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Banners;
