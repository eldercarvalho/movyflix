import { useCallback, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import TextFiled from '../TextField';
import Button from '../Button';

import { Container } from './styles';

const TextField: React.FC = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleClick = useCallback(() => {
    setIsSearchActive((oldValue) => !oldValue);
    textFieldRef.current?.focus();
  }, []);

  return (
    <Container isActive={isSearchActive}>
      <TextFiled
        ref={textFieldRef}
        className="search-field"
        placeholder="Search"
        onBlur={() => !textFieldRef.current?.value && setIsSearchActive(false)}
      />

      <Button iconOnly textOnly onClick={handleClick}>
        <FiSearch size={22} />
      </Button>
    </Container>
  );
};

export default TextField;
