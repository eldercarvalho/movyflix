import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

// import { FormHandles } from '@unform/core';
import TextField from '../TextField';
import Button from '../Button';

import { Container } from './styles';

interface SearchProps {
  onSearchChange(query: string): void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState('');
  // const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        textFieldRef.current?.value === ''
      ) {
        setIsSearchActive(false);
        setSearch('');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.addEventListener('click', handleOutsideClick);
    };
  }, []);

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
        placeholder="Search"
        value={search}
        onChange={handleTextFieldChange}
      />

      {isSearchActive && search.length > 0 ? (
        <Button iconOnly textOnly onClick={handleClearSearch}>
          <FiX size={22} />
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