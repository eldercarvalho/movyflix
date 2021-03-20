import { useLocation } from 'react-router-dom';
import { LocationState } from '../types';

const useParentRoutePath = () => {
  const location = useLocation<LocationState>();

  const parentRoutePath = location.pathname.includes('/movies')
    ? location.state
      ? location.state.from
      : '/'
    : location.pathname;

  return parentRoutePath;
};

export default useParentRoutePath;
