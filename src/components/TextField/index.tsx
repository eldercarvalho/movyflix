import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import generateRandomKey from '../../utils/generateRandomKey';

import { Container, Error } from './styles';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  error?: string;
  prependIcon?: string;
  dark?: boolean;
  label?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { id = generateRandomKey(8), className, error, label, dark = false, ...rest },
    forwardedRef,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    useImperativeHandle(forwardedRef, () =>
      inputRef.current ? inputRef.current : document.createElement('input'),
    );

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
      setIsFilled(!!inputRef.current?.value);
    };

    return (
      <Container
        className={className}
        isFocused={isFocused}
        isFilled={isFilled}
        isErrored={!!error}
        dark={dark}
      >
        {label && <label htmlFor={id}>{label}</label>}
        <div>
          <input
            ref={inputRef}
            id={id}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />
        </div>
        {error && <Error>{error}</Error>}
      </Container>
    );
  },
);

export default TextField;
