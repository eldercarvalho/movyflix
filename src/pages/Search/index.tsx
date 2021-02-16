import { useSelector } from 'react-redux';
import { CgClapperBoard } from 'react-icons/cg';

import { Store } from '../../store';

import MoviesGrid from '../../components/layout/MoviesGrid';

import { Content } from '../../styles/Content';

import { NoResultFound } from './styles';

const Home: React.FC = () => {
  const { search, searchLoading } = useSelector((store: Store) => store.movies);

  return (
    <Content headerOffset>
      {search.results.length > 0 && !searchLoading && (
        <MoviesGrid data={search.results} />
      )}

      {search.results.length === 0 && !searchLoading && (
        <NoResultFound>
          <CgClapperBoard size={100} />
          <h2>No movies found</h2>
        </NoResultFound>
      )}
    </Content>
  );
};

export default Home;
