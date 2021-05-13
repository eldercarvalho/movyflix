import { CgClapperBoard } from 'react-icons/cg';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { searchMovies } from '../../store/slices/movies';

import MoviesGrid from '../../components/layout/MoviesGrid';
import InfiniteLoading from '../../components/base/InfiniteLoading';

import { Content } from '../../styles/Content';

import { NoResultFound } from './styles';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.movies.search);
  const searchLoading = useAppSelector((state) => state.movies.searchLoading);

  const fetchMoreResults = (page: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || '';

    dispatch(searchMovies({ query, page }));
  };

  return (
    <Content headerOffset>
      {search.results.length > 0 && <MoviesGrid data={search.results} />}

      {search.results.length === 0 && !searchLoading && (
        <NoResultFound>
          <CgClapperBoard size={100} />
          <h2>Nenhum filme encontrado.</h2>
        </NoResultFound>
      )}

      <InfiniteLoading
        page={search.page}
        totalPages={search.total_pages}
        isLoading={searchLoading}
        onPaginate={fetchMoreResults}
      />
    </Content>
  );
};

export default Home;
