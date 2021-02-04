import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Store, fetchTrendingMovies } from '../../store';

import Button from '../Button';
import Carousel from '../Carousel';

import { Container, BannerItem, BannerInfo } from './styles';

const Banners: React.FC = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state: Store) => {
    return {
      movies: state.movies.trendingMovies,
    };
  });

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, []);

  return (
    <Container>
      <Carousel autoplay dotNumber>
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
