import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { store } from './store';
import { theme } from './utils/theme';

import { SupportProvider } from './hooks/support';

import { GlobalStyles } from './styles/global';

import Layout from './components/layout';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SupportProvider>
            <Router>
              <Layout>
                <Routes />
              </Layout>
              <GlobalStyles />
            </Router>
          </SupportProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
