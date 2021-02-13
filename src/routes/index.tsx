import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Movies from '../pages/Movies';
import Genres from '../pages/Genres';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/top-rated" component={Movies} />
      <Route path="/genres" component={Genres} />
    </Switch>
  );
};

export default Routes;
