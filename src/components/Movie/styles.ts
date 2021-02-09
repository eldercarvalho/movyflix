import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface ContainerProps {
  type: string;
}

export const Container = styled(Link)<ContainerProps>`
  position: relative;
  display: block;
  border-radius: 3px;
  background: #000;
  transition: transform 0.3s;

  ${({ type }) =>
    type === 'poster' &&
    css`
      :hover {
        z-index: 1;

        img {
          transform: scale(1.1);
        }
      }
    `}

  ${({ type }) =>
    type === 'backdrop' &&
    css`
      :hover {
        z-index: 1;
        transform: scale(1.15);
        box-shadow: 0 5px 5px rgba(229, 9, 20, 0.5);

        > div {
          padding-left: 1.6rem;
        }
      }
    `}

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
