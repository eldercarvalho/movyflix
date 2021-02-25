import { useSelector } from 'react-redux';
import {
  Route as ReactRoute,
  RouteProps as ReactRouteProps,
  Redirect,
} from 'react-router-dom';
import { Store } from '../store';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { isUserLoggedIn } = useSelector((store: Store) => store.auth);

  return (
    <ReactRoute
      {...rest}
      render={() => {
        return isPrivate === isUserLoggedIn ? (
          <Component />
        ) : isPrivate ? (
          <Redirect to={{ pathname: '/' }} />
        ) : (
          <Component />
        );
      }}
    />
  );
};

export default Route;
