import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import Search from '../pages/Search';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search" component={Search} />
    </Switch>
  );
};

export default Routes;
