import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FiBookmark, FiCalendar, FiHeart, FiList } from 'react-icons/fi';
import { fetchMovieDetails, Store } from '../../store';

import Carousel from '../../components/shared/Carousel';
import { Image } from '../../components/shared/Image';

import { Content } from '../../styles/Content';
import { SectionTitle } from '../../styles/SectionTitle';
import { ImageSkeleton } from '../../styles/ImageSkeleton';

import {
  CastPerson,
  MovieContent,
  MovieInfo,
  TopInfoContainer,
  VoteAverage,
  MovieInfoSection,
} from './styles';
import Button from '../../components/shared/Button';

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
    if (voteAverage < 5) return 'error';

    if (voteAverage >= 5 && voteAverage < 7) return 'warning';

    return 'success';
  };

  if (movieDetails.vote_average) {
    console.log(getVoteAvarageColor(movieDetails.vote_average));
  }

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  return (
    <Content headerOffset>
      <MovieContent>
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
        </div>

        <MovieInfo>
          <SectionTitle>{movieDetails.title}</SectionTitle>

          <TopInfoContainer>
            <VoteAverage color={getVoteAvarageColor(movieDetails.vote_average)}>
              <strong>{movieDetails.vote_average}</strong>
              {/* <span>{movieDetails.vote_count} votes</span> */}
            </VoteAverage>

            <Button iconOnly rounded>
              <FiList size={22} />
            </Button>

            <Button iconOnly rounded>
              <FiHeart size={22} />
            </Button>

            <Button iconOnly rounded>
              <FiBookmark size={22} />
            </Button>

            {/* <span>
              <FiCalendar size={22} /> {movieDetails.release_date}
            </span> */}
          </TopInfoContainer>

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
                    <CastPerson to={`/person/${person.id}`}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
                        alt={person.name}
                      />
                      <h4>{person.name}</h4>
                      <p>{person.character}</p>
                    </CastPerson>
                  </Carousel.Item>
                ))}
              </Carousel>
            </MovieInfoSection>
          )}
        </MovieInfo>
      </MovieContent>
    </Content>
  );
};

export default MovieDetails;
