import styled from 'styled-components';

export const Container = styled.div`
  .carousel__item {
    & + div {
      padding-right: 1rem;
    }
  }

  .carousel__pagination {
    margin-top: 1.6rem;
  }
`;
