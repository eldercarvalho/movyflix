import { useSelector } from 'react-redux';
import { CgClapperBoard } from 'react-icons/cg';

import { Store } from '../../store';

import Movie from '../../components/layout/Movie';
import MoviesGrid from '../../components/layout/MoviesGrid';

import { Container, Content, Section, Grid, NoResultFound } from './styles';

const Home: React.FC = () => {
  const { search, searchLoading } = useSelector((store: Store) => store.movies);

  return (
    <Container>
      <Content>
        <Section>
          {search.results.length > 0 && !searchLoading && (
            <MoviesGrid data={search.results} />
          )}

          {search.results.length === 0 && !searchLoading && (
            <NoResultFound>
              <CgClapperBoard size={100} />
              <h2>No movies found</h2>
            </NoResultFound>
          )}
        </Section>
      </Content>
    </Container>
  );
};

export default Home;
