import { Switch } from 'react-router-dom';

import Route from './Route';
import ScrollToTop from './ScrollToTop';

import Home from '../pages/Home';
import Search from '../pages/Search';
import TopRated from '../pages/TopRated';
import Genres from '../pages/Genres';
import MovieDetails from '../pages/MovieDetails';
import Person from '../pages/Person';
import Profile from '../pages/Profile';

const Routes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/top-rated" component={TopRated} />
        <Route path="/genres" component={Genres} />
        <Route path="/movies/:id" component={MovieDetails} />
        <Route path="/person/:id" component={Person} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </>
  );
};

export default Routes;
