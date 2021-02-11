import { useSelector } from 'react-redux';

import { Store } from '../../store';

import Movie from '../../components/layout/Movie';

import { Container, Content, Section, Grid } from './styles';

const Home: React.FC = () => {
  const { search, searchLoading } = useSelector((store: Store) => store.movies);

  return (
    <Container>
      <Content>
        <Section>
          {/* <SectionTitle>Results</SectionTitle> */}

          <Grid>
            {search.results.length
              ? search.results.map((movie) => <Movie key={movie.id} data={movie} />)
              : !searchLoading && <h2>No result found</h2>}
          </Grid>
        </Section>
      </Content>
    </Container>
  );
};

export default Home;
