import styled, { css, keyframes } from 'styled-components';
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
    type === 'backdrop' &&
    css`
      :hover {
        z-index: 1;
        transform: scale(1.15);
      }
    `}
`;

interface MovieImageProps {
  type: string;
}

const FadeIn = keyframes`
  from { opacity: 0 } to { opacity: 1 }
`;

export const MovieImage = styled.div<MovieImageProps>`
  position: relative;
  height: 18.4vw;
  background: #222;
  border-radius: 3px;
  margin-bottom: 1.6rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;

  img {
    display: block;
    object-fit: cover;
    height: 100%;
  }

  ${({ type }) =>
    type === 'poster' &&
    css`
      :hover {
        z-index: 1;
        transform: scale(1.1);
      }

      img {
        animation: ${FadeIn} 300ms forwards;
      }
    `}

  ${({ type }) =>
    type === 'backdrop' &&
    css`
      height: 250px;
      margin-bottom: 0;

      img {
        position: initial;
      }
    `}
`;

interface MovieInfoProps {
  type: string;
}

export const MovieInfo = styled.div<MovieInfoProps>`
  padding-bottom: 1.6rem;
  transition: padding 0.3s;

  strong {
    font-size: 1.6rem;
    display: block;
    font-weight: 500;
    margin-bottom: 0.7rem;
  }

  div {
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
  }

  ${({ type }) =>
    type === 'backdrop' &&
    css`
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      padding: 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 48%);

      strong {
        font-weight: 600;
      }

      div {
        color: #ccc;

        span {
          svg {
            fill: #ccc;
          }

          &:nth-child(2) {
            border-color: #ccc;
          }
        }
      }
    `}
`;
