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
  const request_token = useSelector((store: Store) => store.auth.request_token);

  return (
    <ReactRoute
      {...rest}
      render={() => {
        return isPrivate === !!request_token ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        );
      }}
    />
  );
};

export default Route;
