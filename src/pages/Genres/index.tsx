import { useEffect, useMemo, useState } from 'react';
import { Content } from '../../styles/Content';
import { useAppDispatch, useAppSelector } from '../../hooks';

import Button from '../../components/shared/Button';

import { SectionTitle } from '../../styles/SectionTitle';
import { Container, GenresList } from './styles';
import { fetchDiscover, fetchGenres } from '../../store/slices/movies';
import MoviesGrid from '../../components/layout/MoviesGrid';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.movies.genres);
  const isFetching = useAppSelector((state) => state.movies.isFetching);
  const discover = useAppSelector((state) => state.movies.discover);
  const firstGenreId = useMemo(() => (genres[0] ? genres[0].id : null), [genres]);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    if (firstGenreId) {
      dispatch(fetchDiscover(28));
    }
  }, [dispatch, firstGenreId]);

  const handleGenreClick = (genreId: number) => {
    dispatch(fetchDiscover(genreId));
  };

  return (
    <Content headerOffset>
      <SectionTitle>Gêneros</SectionTitle>

      <Container>
        <GenresList>
          {genres.map((genre) => (
            <button
              type="button"
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </GenresList>

        <div>
          <MoviesGrid data={discover.results} />
        </div>
      </Container>
    </Content>
  );
};

export default Home;
