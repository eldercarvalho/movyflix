import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { Store } from '../../../store';

import TextField from '../../shared/TextField';
import Button from '../../shared/Button';

import { Container } from './styles';
import Loading from '../../shared/Loading';

interface SearchProps {
  onSearchChange(query: string): void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState('');
  const { searchLoading } = useSelector((store: Store) => store.movies);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        (containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          textFieldRef.current?.value === '') ||
        (event.target as Node).nodeName === 'A'
      ) {
        setIsSearchActive(false);
        setSearch('');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    const unlisten = history.listen((route) => {
      if (route.pathname !== '/search') {
        setSearch('');
      }
    });

    return () => {
      document.addEventListener('click', handleOutsideClick);

      unlisten();
    };
  }, [history]);

  const handleOpenClick = () => {
    setIsSearchActive(true);
    textFieldRef.current?.focus();
  };

  const handleClearSearch = (event: MouseEvent) => {
    event.stopPropagation();
    setSearch('');
    onSearchChange('');
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <Container ref={containerRef} isActive={isSearchActive}>
      <TextField
        ref={textFieldRef}
        dark
        className="search-field"
        placeholder="Pesquisa"
        value={search}
        onChange={handleTextFieldChange}
      />

      {isSearchActive && search.length > 0 ? (
        <Button iconOnly textOnly onClick={handleClearSearch}>
          {!searchLoading ? <FiX size={22} /> : <Loading dark size={22} thickness={2} />}
        </Button>
      ) : (
        <Button iconOnly textOnly onClick={handleOpenClick}>
          <FiSearch size={22} />
        </Button>
      )}
    </Container>
  );
};

export default Search;
