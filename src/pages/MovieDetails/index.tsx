import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FiBookmark, FiHeart, FiList, FiStar } from 'react-icons/fi';
import { clearMovieDetails, fetchMovieDetails, Store } from '../../store';

import Carousel from '../../components/shared/Carousel';
import { Image } from '../../components/shared/Image';

import { Content } from '../../styles/Content';

import {
  CastPerson,
  MovieContent,
  MovieInfo,
  MovieBanner,
  MovieActions,
  VoteAverage,
  MovieInfoSection,
} from './styles';
import Button from '../../components/shared/Button';
import { LoadingIcon } from '../../styles/LoadingIcon';

interface RouteParams {
  id: string;
}

const MovieDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { movieDetails, isFetchingMovieDetails } = useSelector(
    (store: Store) => store.movies,
  );
  const { id } = useParams<RouteParams>();

  const getVoteAvarageColor = (voteAverage: number): string => {
    if (voteAverage >= 5 && voteAverage < 7) return 'warning';

    if (voteAverage < 5) return 'error';

    return 'success';
  };

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch]);

  return (
    <Content headerOffset>
      {isFetchingMovieDetails ? (
        <LoadingIcon size={60} screenCenter />
      ) : (
        <MovieContent>
          <div>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>

          <MovieInfo>
            <MovieBanner>
              <h2>
                {movieDetails.title} <span>({movieDetails.year})</span>
              </h2>

              <VoteAverage color={getVoteAvarageColor(movieDetails.vote_average)}>
                <strong>
                  <FiStar size={26} /> {movieDetails.vote_average}
                </strong>
                <span>{movieDetails.vote_count} votes</span>
              </VoteAverage>

              <MovieActions>
                <Button iconOnly rounded>
                  <FiList size={22} />
                </Button>

                <Button iconOnly rounded>
                  <FiHeart size={22} />
                </Button>

                <Button iconOnly rounded>
                  <FiBookmark size={22} />
                </Button>
              </MovieActions>
            </MovieBanner>

            <MovieInfoSection>
              <h3>OVERVIEW</h3>
              <p>{movieDetails.overview}</p>
            </MovieInfoSection>

            {movieDetails.credits && (
              <MovieInfoSection>
                <h3>CAST</h3>
                <Carousel items={8} navs={false}>
                  {movieDetails.credits.cast.slice(0, 16).map((person) => (
                    <Carousel.Item key={person.id}>
                      <CastPerson
                        hasImage={!!person.profile_path}
                        to={`/person/${person.id}`}
                      >
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
                            alt={person.name}
                          />
                        ) : (
                          <img src="/img/person.svg" alt={person.name} />
                        )}
                      </CastPerson>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </MovieInfoSection>
            )}
          </MovieInfo>
        </MovieContent>
      )}
    </Content>
  );
};

export default MovieDetails;
