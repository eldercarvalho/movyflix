import MainHeader from './MainHeader';
import ToastContainer from '../shared/ToastContainer';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <ToastContainer />
      <MainHeader />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
