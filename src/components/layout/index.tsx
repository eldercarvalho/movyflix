import { useSelector } from 'react-redux';

import MainHeader from './MainHeader';
import ToastContainer from '../shared/ToastContainer';
import Footer from './Footer';

import { RootState } from '../../store';

import { LayoutContainer, MainContainer } from './styles';

const Layout: React.FC = ({ children }) => {
  const backdropPath = useSelector((state: RootState) => {
    if (state.movies.movieDetails.backdrop_path) {
      return `https://image.tmdb.org/t/p/w1280/${state.movies.movieDetails.backdrop_path}`;
    }

    return null;
  });

  return (
    <LayoutContainer bgImage={backdropPath}>
      <ToastContainer />

      <MainHeader />

      <MainContainer>{children}</MainContainer>

      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
