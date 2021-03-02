import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { http } from './services/http';

import { store, RootState, STORAGE_STATE_KEY } from './store';
import { theme } from './utils/theme';

import { SupportProvider } from './hooks/support';

import { GlobalStyles } from './styles/global';

import Layout from './components/layout';

import Routes from './routes';

const state: RootState = JSON.parse(localStorage.getItem(STORAGE_STATE_KEY) || '{}');

if ('auth' in state && state.auth.isUserLoggedIn) {
  http.defaults.params.session_id = state.auth.sessionId;
}

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
