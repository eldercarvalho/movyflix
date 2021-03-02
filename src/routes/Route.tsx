import { useSelector } from 'react-redux';
import {
  Route as ReactRoute,
  RouteProps as ReactRouteProps,
  Redirect,
} from 'react-router-dom';
import { RootState } from '../store';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { isUserLoggedIn } = useSelector((state: RootState) => state.auth);

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
