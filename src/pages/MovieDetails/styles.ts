import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

const FadeUp = keyframes`
  from { 
    top: 100px;
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    top: 0;
    opacity: 1;
    transform: scale(1);
  }
`;

export const MovieContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 33% 67%;
  gap: 0 5rem;
  max-width: 1100px;
  margin: 0 auto;
  animation: ${FadeUp} 1s forwards;
`;

export const MovieInfo = styled.div`
  h3 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 1.6rem;
    opacity: 0.8;
  }

  p {
    line-height: 1.5;
    opacity: 0.8;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

export const MovieBanner = styled.section`
  position: relative;
  background-size: cover;
  background-position: center center;
  margin-bottom: 3rem;
  height: 200px;

  h2 {
    font-size: 3rem;

    span {
      font-weight: 400;
      opacity: 0.8;
    }
  }
`;

interface VoteAverageProps {
  color: string;
}

export const VoteAverage = styled.div<VoteAverageProps>`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  text-align: center;

  strong {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.6rem;
    font-weight: 500;

    svg {
      margin-right: 0.5rem;
    }
  }

  span {
    color: #ccc;
    font-size: 1.2rem;
    font-weight: 500;
  }

  ${({ color, theme }) => css`
    strong {
      color: ${theme.colors[color]};
    }
  `}
`;

export const MovieActions = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(40%);

  button {
    margin-left: 1.6rem;
  }
`;

export const MovieInfoSection = styled.div`
  & + div {
    margin-top: 3rem;
  }
`;

interface CastPerson {
  hasImage: boolean;
}

export const CastPerson = styled(Link)<CastPerson>`
  display: block;
  position: relative;
  padding-right: 0.5rem;
  max-width: 75px;
  height: 75px;
  overflow: hidden;
  border-radius: 46px;
  background: #222;

  img {
    position: absolute;
    top: 10px;
    width: 100%;

    ${({ hasImage }) =>
      hasImage &&
      css`
        top: -10px;
      `}
  }

  h4 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-top: 1rem;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1.2rem;
  }
`;
