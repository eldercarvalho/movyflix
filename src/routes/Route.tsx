import {
  Route as ReactRoute,
  RouteProps as ReactRouteProps,
  Redirect,
} from 'react-router-dom';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  return (
    <ReactRoute
      {...rest}
      render={() => {
        return isPrivate === false ? <Component /> : <Redirect to={{ pathname: '/' }} />;
      }}
    />
  );
};

export default Route;
