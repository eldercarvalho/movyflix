import { rgba } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const FieldControl = styled.div`
  display: flex;

  input {
    width: 100%;
    height: 40px;
    background: ${rgba('#000', 0.5)};
    font-size: 1.4rem;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
    padding: 0 1.6rem;
    transition: 0.3s;

    &::placeholder {
      color: ${rgba('#FFF', 0.5)};
    }
  }
`;
