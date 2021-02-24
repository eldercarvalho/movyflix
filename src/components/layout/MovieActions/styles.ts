import styled from 'styled-components';

import devices from '../../../utils/media';

export const Container = styled.div`
  button {
    margin-left: 1.6rem;
  }

  @media ${devices.mobileL} {
    position: relative;
    text-align: center;
  }
`;
