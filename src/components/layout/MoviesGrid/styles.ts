import styled from 'styled-components';

import devices from '../../../utils/media';

import { Container as MovieContainer } from '../Movie/styles';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 4rem 2.2rem;

  a {
    display: block;

    img {
      border-radius: 3px;
    }
  }

  @media ${devices.mobileL} {
    display: block;
    overflow-y: auto;
    white-space: nowrap;

    ${MovieContainer} {
      width: 200px;
      display: inline-block;
      vertical-align: top;

      & + a {
        margin-left: 1.6rem;
      }

      strong {
        white-space: normal;
      }
    }
  }
`;
