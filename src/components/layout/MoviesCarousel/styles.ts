import styled from 'styled-components';

import devices from '../../../utils/media';

export const Container = styled.div`
  position: relative;
  margin-left: -1rem;

  :hover {
    .carousel__nav {
      opacity: 1;
    }
  }

  .carousel__item {
    padding-left: 1rem;
  }

  .carousel__nav {
    opacity: 0;
  }

  @media ${devices.tablet} {
    .carousel__item {
      & + div {
        padding-right: 0;
      }
    }

    .carousel__nav {
      opacity: 1;
    }
  }
`;
