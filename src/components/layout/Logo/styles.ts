import styled from 'styled-components';

import devices from '../../../utils/media';

export const Container = styled.h1`
  font-weight: 300;

  a {
    span {
      font-weight: 700;
      color: ${(props) => props.theme.colors.accent};
    }
  }

  @media ${devices.mobileL} {
    font-size: 2.8rem;
  }
`;
