import { useState } from 'react';
import { useSelector } from 'react-redux';
import useParentRoutePath from '../../../hooks/parentRoutePath';

import { RootState } from '../../../store';

import Button from '../../base/Button';
import Carousel from '../../base/Carousel';

import { Container, BannerItem, BannerInfo } from './styles';
import Loading from '../../base/Loading';

const Banners: React.FC = () => {
  const parentRoutePath = useParentRoutePath();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { trending, isFetchingTrending } = useSelector(
    (state: RootState) => state.movies,
  );

  return (
    <Container>
      {isFetchingTrending && (
        <span>
          <Loading size={80} />
        </span>
      )}

      <Carousel dotNumber>
        {trending.slice(0, 6).map((movie) => (
          <Carousel.Item key={movie.id}>
            <BannerItem className={isImageLoaded ? 'show' : ''}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
                onLoad={() => setIsImageLoaded(true)}
              />

              {isImageLoaded && (
                <BannerInfo>
                  <h1>{movie.title}</h1>
                  <p>{movie.overview}</p>
                  <div>
                    <Button
                      to={{
                        pathname: `/movies/${movie.id}`,
                        state: { backdrop: movie.backdrop_path, from: parentRoutePath },
                      }}
                    >
                      Mais detalhes
                    </Button>
                    <span>{movie.formatted_release_date}</span>
                  </div>
                </BannerInfo>
              )}
            </BannerItem>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Banners;
