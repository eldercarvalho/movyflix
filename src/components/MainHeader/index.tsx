import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

import Button from '../Button';

import { Container, Logo, Menu, Search } from './styles';

const MainHeader: React.FC = () => {
  const [isDarken, setIsDarken] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

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

      <Search isActive={isSearchActive}>
        <input type="text" placeholder="Search" />
        <Button
          iconOnly
          textOnly
          onClick={() => setIsSearchActive((oldValue) => !oldValue)}
        >
          <FiSearch size={22} />
        </Button>
      </Search>

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
