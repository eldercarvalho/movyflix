import styled from 'styled-components';

import devices from '../../../utils/media';

export const Container = styled.div`
  position: relative;

  .carousel__item {
    & + div {
      padding-right: 1rem;
    }
  }

  @media ${devices.tablet} {
    .carousel__item {
      & + div {
        padding-right: 0;
      }
    }

    .carousel__pagination {
      opacity: 1;
    }

    /* .carousel__dots {
      display: none;
    } */
  }
`;
