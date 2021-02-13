import styled from 'styled-components';

import devices from '../../../utils/media';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 4rem 2.2rem;

  a {
    display: block;

    img {
      border-radius: 3px;
    }
  }

  @media ${devices.mobileL} {
    display: flex;
    overflow-y: auto;
  }
`;
