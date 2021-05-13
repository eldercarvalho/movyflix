import { Switch } from 'react-router-dom';
import { Content } from '../../styles/Content';
import Route from '../../routes/Route';
import Lists from './Lists';

const Profile: React.FC = () => {
  return (
    <Content headerOffset>
      <Switch>
        <Route path="/profile/lists" component={Lists} isPrivate />
        <Route path="/profile/watchlist" component={Lists} isPrivate />
        <Route path="/profile/watchlist" component={Lists} isPrivate />
      </Switch>
    </Content>
  );
};

export default Profile;
