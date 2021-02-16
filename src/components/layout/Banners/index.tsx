import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Store } from '../../../store';

import Button from '../../shared/Button';
import Carousel from '../../shared/Carousel';

import { LoadingIcon } from '../../../styles/LoadingIcon';
import { Container, BannerItem, BannerInfo } from './styles';

const Banners: React.FC = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { trending, isFetchingTrending } = useSelector((store: Store) => store.movies);

  return (
    <Container>
      {isFetchingTrending && (
        <span>
          <LoadingIcon size={50} />
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
                    <Button>More details</Button>
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
