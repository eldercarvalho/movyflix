import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  &:hover {
    .carousel__pagination {
      opacity: 1;
    }
  }

  .carousel__item {
    & + div {
      padding-right: 1rem;
    }
  }

  .carousel__pagination {
    transition: 0.3s;
    opacity: 0;
  }

  /* .carousel__nav {
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 2;

    &.carousel__nav-prev {
      background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 95%);
    }
  } */

  /* .carousel__dots {
    position: absolute;
    bottom: calc(100% + 1rem);
    right: 0;
  } */
`;
