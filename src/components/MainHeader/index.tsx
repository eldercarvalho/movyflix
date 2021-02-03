import { NavLink, Link } from 'react-router-dom';

import { Container, Logo, Menu } from './styles';

const MainHeader: React.FC = () => {
  return (
    <Container>
      <Logo>
        <Link to="/">
          Movy<span>Flix</span>
        </Link>
      </Logo>

      <Menu>
        <NavLink to="/home" activeClassName="--active">
          Home
        </NavLink>
        <NavLink to="/popular" activeClassName="--active">
          Popular
        </NavLink>
        <NavLink to="/trending" activeClassName="--active">
          Trending
        </NavLink>
      </Menu>
    </Container>
  );
};

export default MainHeader;
