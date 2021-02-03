import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './styles/global';

import { theme } from './utils/theme';

import MainHeader from './components/MainHeader';

import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <MainHeader />
          <Home />
          <GlobalStyles />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
