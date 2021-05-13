import { useEffect, useRef, useState } from 'react';
import { Content } from '../../styles/Content';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { SectionTitle } from '../../styles/SectionTitle';
import { fetchDiscover, fetchGenres } from '../../store/slices/movies';
import MoviesGrid from '../../components/layout/MoviesGrid';

import { Container, GenresList, GenresListItem } from './styles';
import InfiniteLoading from '../../components/base/InfiniteLoading';

const Home: React.FC = () => {
  const genresListRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.movies.genres);
  const isFetching = useAppSelector((state) => state.movies.isFetching);
  const discover = useAppSelector((state) => state.movies.discover);
  const [activeGenreId, setActiveGenreId] = useState(28);

  useEffect(() => {
    dispatch(fetchGenres());

    const width = genresListRef.current?.offsetWidth;
    const rectTop = genresListRef.current?.getBoundingClientRect().top;
    const headerHeight = 68;

    const restoreGenresListStyle = () => {
      if (genresListRef.current) {
        genresListRef.current.style.position = 'initial';
        genresListRef.current.style.top = 'initial';
        genresListRef.current.style.width = `initial`;
      }
    };

    const handleWindowScroll = () => {
      if (genresListRef.current && rectTop && window.scrollY >= rectTop - headerHeight) {
        genresListRef.current.style.position = 'fixed';
        genresListRef.current.style.top = `${headerHeight}px`;
        genresListRef.current.style.width = `${width}px`;
        return;
      }

      restoreGenresListStyle();
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [dispatch]);

  useEffect(() => {
    const page = 1;

    const asyncFetchDiscover = async () => {
      await dispatch(fetchDiscover({ genreId: activeGenreId, page }));

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };

    asyncFetchDiscover();
  }, [dispatch, activeGenreId]);

  const handleOnPaginate = (page: number) => {
    dispatch(fetchDiscover({ genreId: activeGenreId, page }));
  };

  return (
    <Content headerOffset>
      <SectionTitle>Gêneros</SectionTitle>

      <Container>
        <div>
          <GenresList ref={genresListRef}>
            {genres.map((genre) => (
              <GenresListItem
                type="button"
                key={genre.id}
                isActive={activeGenreId === genre.id}
                onClick={() => setActiveGenreId(genre.id)}
              >
                <span>{genre.name}</span>
              </GenresListItem>
            ))}
          </GenresList>
        </div>

        <div>
          <MoviesGrid data={discover.results} />
        </div>

        <InfiniteLoading
          page={discover.page}
          totalPages={discover.total_pages}
          isLoading={isFetching}
          onPaginate={handleOnPaginate}
        />
      </Container>
    </Content>
  );
};

export default Home;
