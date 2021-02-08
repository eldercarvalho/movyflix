import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  position: relative;
  display: block;
  border-radius: 3px;

  :hover {
    img {
      transform: scale(1.1);
    }
  }

  img {
    transition: transform 0.3s;
    margin-bottom: 2rem;
  }

  div {
    padding-bottom: 1.6rem;
    transition: padding 0.3s;

    strong {
      font-size: 1.6rem;
      display: block;
      font-weight: 500;
      margin-bottom: 0.7rem;
    }
  }
`;

export const MovieDetails = styled.div`
  display: flex;
  align-items: center;
  color: #777;

  span {
    display: inline-flex;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 600;

    svg {
      fill: #777;
      margin-right: 0.5rem;
    }

    &:nth-child(2) {
      margin-left: 1.6rem;
      padding-left: 1.6rem;
      border-left: 2px solid #333;
    }
  }
`;
