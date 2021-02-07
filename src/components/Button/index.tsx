import React, { ButtonHTMLAttributes, useCallback, MouseEvent } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

import { Container } from './style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  to?: string;
  iconOnly?: boolean;
  full?: boolean;
  small?: boolean;
  disabled?: boolean;
  textOnly?: boolean;
  light?: boolean;
  outline?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  to,
  onClick,
  iconOnly,
  full,
  small,
  disabled = false,
  textOnly,
  light = false,
  outline,
  loading = false,
  ...rest
}) => {
  const history = useHistory();

  const handleClick = useCallback(
    (event) => {
      if (onClick && !disabled) {
        onClick(event);
      }

      if (to && !disabled) {
        history.push(to);
      }
    },
    [history, onClick, to, disabled],
  );

  return (
    <Container
      type="button"
      variant={variant}
      isIconOnly={iconOnly}
      isFull={full}
      isSmall={small}
      isDisabled={disabled}
      isTextOnly={textOnly}
      isLigthed={light}
      isOutlined={outline}
      isLoading={loading}
      onClick={(event: MouseEvent<HTMLButtonElement>) => handleClick(event)}
      {...rest}
    >
      {loading ? <BiLoaderAlt size={22} /> : children}
    </Container>
  );
};

export default Button;
