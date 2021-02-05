import { forwardRef, InputHTMLAttributes } from 'react';

import { Container, FieldControl } from './styles';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Container className={className}>
        <FieldControl>
          <input ref={ref} type="text" {...rest} />
        </FieldControl>
      </Container>
    );
  },
);

export default TextField;
