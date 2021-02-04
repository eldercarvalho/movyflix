import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { store } from './store';
import { theme } from './utils/theme';

import { GlobalStyles } from './styles/global';

import MainHeader from './components/MainHeader';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <MainHeader />
            <Routes />
            <GlobalStyles />
          </Router>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
