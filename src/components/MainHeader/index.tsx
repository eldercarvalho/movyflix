import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import Search from '../Search';
import Button from '../Button';

import { Container, Logo, Menu } from './styles';

const MainHeader: React.FC = () => {
  const [isDarken, setIsDarken] = useState(false);

  const handleWindowScroll = () => {
    if (window.scrollY > 50) {
      setIsDarken(true);
      return;
    }

    setIsDarken(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <Container isDarken={isDarken}>
      <Logo>
        <Link to="/">
          Movy<span>Flix</span>
        </Link>
      </Logo>

      <Search />

      <Menu>
        <NavLink to="/" activeClassName="--active">
          Home
        </NavLink>
        <NavLink to="/popular" activeClassName="--active">
          Popular
        </NavLink>
        <NavLink to="/trending" activeClassName="--active">
          Trending
        </NavLink>
      </Menu>

      <Button>Sign in</Button>
    </Container>
  );
};

export default MainHeader;
