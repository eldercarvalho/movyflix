import { useEffect, useRef, useState } from 'react';

import Carousel from '../../components/Carousel';

import { http } from '../../services/http';

import { Container, Banners } from './styles';

import posterImg from '../../assets/images/venom.jpg';

interface IMovie {
  id: number;
  poster_path: string;
  backdrop_path: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  // const carousel = useRef(null);

  useEffect(() => {
    http
      .get('trending/movie/week')
      .then((res) => res.data)
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <Container>
      <Banners>
        <Carousel autoplay items={1}>
          <Carousel.Item>
            <img src={posterImg} alt="" />
          </Carousel.Item>
          {/* {movies.map((movie) => (
            <Carousel.Item key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt=""
              />
            </Carousel.Item>
          ))} */}
        </Carousel>
      </Banners>
    </Container>
  );
};

export default Home;
