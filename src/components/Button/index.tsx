import React, { ButtonHTMLAttributes, useCallback, MouseEvent } from 'react';
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
      onClick={(event: MouseEvent<HTMLButtonElement>) => handleClick(event)}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default Button;
