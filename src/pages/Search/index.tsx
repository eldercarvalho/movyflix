import { useDispatch, useSelector } from 'react-redux';
import { CgClapperBoard } from 'react-icons/cg';

import { searchMovies, Store } from '../../store';

import MoviesGrid from '../../components/layout/MoviesGrid';
import InfiniteLoading from '../../components/shared/InfiniteLoading';

import { Content } from '../../styles/Content';

import { NoResultFound } from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { search, searchLoading } = useSelector((store: Store) => store.movies);

  const fetchMoreResults = (page: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || '';

    dispatch(searchMovies(query, page));
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
        onReachEnd={fetchMoreResults}
      />
    </Content>
  );
};

export default Home;
