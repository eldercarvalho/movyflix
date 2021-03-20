import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import { formatReleaseDate } from '../../utils/formatReleaseDate';
import { mediaSizes } from '../../utils/media';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  clearMovieDetails,
  fetchMovieDetails,
  setMovieDetailsBackdrop,
} from '../../store/slices/movies';

import Carousel from '../../components/shared/Carousel';
import Button from '../../components/shared/Button';
import { Image } from '../../components/shared/Image';
import MoviesCarousel from '../../components/layout/MoviesCarousel';
import Loading from '../../components/shared/Loading';
import MovieActions from '../../components/layout/MovieActions';

import { Content } from '../../styles/Content';
import { SectionTitle } from '../../styles/SectionTitle';

import {
  CenterContainer,
  Images,
  Poster,
  MovieContent,
  Info,
  Banner,
  VoteAverage,
  InfoSection,
  ShortSpecifications,
  Specifications,
  Crew,
  CastPerson,
  Similar,
} from './styles';

interface RouteParams {
  id: string;
}

interface LocationState {
  backdrop: string;
  from: string;
}

const MovieDetails: React.FC = () => {
  const location = useLocation<LocationState>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const movieDetails = useAppSelector((state) => state.movies.movieDetails);
  const isFetchingDetails = useAppSelector((state) => state.movies.isFetchingDetails);
  const { id } = useParams<RouteParams>();

  const getVoteAvarageColor = (voteAverage: number): string => {
    if (voteAverage >= 5 && voteAverage < 7) return 'warning';

    if (voteAverage < 5) return 'error';

    return 'success';
  };

  const formatRuntime = (runtime: number): string => {
    return `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  };

  const formatCurrency = (value: number): string => {
    if (value === 0) return '-';

    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      value,
    );
  };

  const navigateBack = () => {
    history.push({
      pathname: `${location.state.from}`,
      state: {
        backdrop: location.state.backdrop,
        from: location.pathname,
      },
    });
  };

  useEffect(() => {
    dispatch(setMovieDetailsBackdrop(location.state.backdrop));
    dispatch(fetchMovieDetails(id));

    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, id, location.state.backdrop]);

  return (
    <Content headerOffset>
      {isFetchingDetails ? (
        <Loading screenCenter size={100} />
      ) : (
        <CenterContainer>
          <Button textOnly onClick={navigateBack}>
            <FiArrowLeft size={20} /> Voltar
          </Button>

          <MovieContent>
            <Images>
              <Poster>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                />
              </Poster>

              {/* <InfoSection>
                <h3>POSTERS</h3>
                <Carousel items={4} navs={false}>
                  {movieDetails.images?.posters.slice(0, 8).map((poster) => (
                    <Carousel.Item key={poster.file_path}>
                      <img
                        src={`https://image.tmdb.org/t/p/w185/${poster.file_path}`}
                        alt={`${poster.id}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </InfoSection>

              <InfoSection>
                <h3>BACKDROPS</h3>
                <Carousel navs={false}>
                  {movieDetails.images?.backdrops.slice(0, 8).map((backdrop) => (
                    <Carousel.Item key={backdrop.file_path}>
                      <img
                        src={`https://image.tmdb.org/t/p/w780/${backdrop.file_path}`}
                        alt={`${backdrop.id}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </InfoSection> */}
            </Images>

            <Info>
              <Banner>
                <h2>
                  {movieDetails.title} <span>({movieDetails.year})</span>
                </h2>

                <ShortSpecifications>
                  <span>
                    {formatReleaseDate(movieDetails.release_date, 'dd/MM/yyyy')}
                  </span>
                  <span>
                    {movieDetails.genres &&
                      movieDetails.genres.map((genre) => genre.name).join(', ')}
                  </span>
                  {!!movieDetails.runtime && (
                    <span>{formatRuntime(movieDetails.runtime)}</span>
                  )}
                </ShortSpecifications>

                <Specifications>
                  <li>
                    <strong>Título Original:</strong>
                    {movieDetails.original_title}
                  </li>
                  <li>
                    <strong>Idioma Original:</strong>
                    {movieDetails.original_language?.toUpperCase()}
                  </li>
                  <li>
                    <strong>Orçamento:</strong>
                    {formatCurrency(movieDetails.budget)}
                  </li>
                  <li>
                    <strong>Receita:</strong>
                    {formatCurrency(movieDetails.revenue)}
                  </li>
                </Specifications>

                <VoteAverage color={getVoteAvarageColor(movieDetails.vote_average)}>
                  <strong>
                    <FiStar size={26} /> {movieDetails.vote_average}
                  </strong>
                  <span>{movieDetails.vote_count} votos</span>
                </VoteAverage>

                <MovieActions
                  movieId={movieDetails.id}
                  isFavorite={movieDetails.isFavorite}
                  isInWatchList={movieDetails.isInWatchList}
                  context="movieDetails"
                />
              </Banner>

              <InfoSection>
                <Crew>
                  {movieDetails.credits?.crew.map((person) => (
                    <li key={person.id}>
                      <strong>{person.name}</strong>
                      <span>{person.job}</span>
                    </li>
                  ))}
                </Crew>
              </InfoSection>

              {movieDetails.overview && (
                <InfoSection>
                  <h3>SINOPSE</h3>
                  <p>{movieDetails.overview}</p>
                </InfoSection>
              )}

              {movieDetails.credits?.cast.length > 0 && (
                <InfoSection>
                  <h3>ELENCO</h3>
                  <Carousel
                    items={8}
                    navs={false}
                    responsive={[
                      { breakpoint: 1024, items: 6 },
                      { breakpoint: mediaSizes.mobileL, items: 4 },
                    ]}
                  >
                    {movieDetails.credits?.cast.slice(0, 16).map((person) => (
                      <Carousel.Item key={person.id}>
                        <CastPerson
                          $hasImage={!!person.profile_path}
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
                </InfoSection>
              )}

              {/* {movieDetails.videos?.results.length > 0 && (
                <InfoSection>
                  <h3>VIDEOS</h3>
                  <Carousel navs={false}>
                    {movieDetails.videos?.results.map((video) => (
                      <Carousel.Item key={video.id}>
                        <iframe
                          title="trailer"
                          width="100%"
                          height="380"
                          src={`https://www.youtube.com/embed/${video.key}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </InfoSection>
              )} */}
            </Info>
          </MovieContent>

          {movieDetails.similar?.results.length > 0 && (
            <Similar>
              <SectionTitle>Similares</SectionTitle>
              <MoviesCarousel movieType="poster" data={movieDetails.similar.results} />
            </Similar>
          )}
        </CenterContainer>
      )}
    </Content>
  );
};

export default MovieDetails;
