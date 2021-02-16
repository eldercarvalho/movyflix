import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const MovieContent = styled.div`
  display: grid;
  grid-template-columns: 33% 67%;
  gap: 0 5rem;
  max-width: 1220px;
  margin: 0 auto;
`;

export const MovieInfo = styled.div`
  h3 {
    font-weight: 600;
    margin-bottom: 1.6rem;
    /* color: ${({ theme }) => theme.colors.accent}; */
    opacity: 0.8;
  }

  p {
    line-height: 1.5;
    opacity: 0.8;
  }
`;

export const TopInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  button {
    margin-left: 1.6rem;
  }
`;

interface VoteAverageProps {
  color: string;
}

export const VoteAverage = styled.div<VoteAverageProps>`
  strong {
    font-size: 3rem;
    font-weight: 500;
    display: block;
    margin-right: 1rem;
    border: 1px solid;
    padding: 1rem;
    border-radius: 3px;
    width: 67px;
    text-align: center;
  }

  span {
    color: #ccc;
    font-size: 1.4rem;
  }

  ${({ color, theme }) => css`
    strong {
      color: ${theme.colors[color]};
    }
  `}
`;

export const MovieInfoSection = styled.div`
  /* background: rgba(0, 0, 0, 0.5); */
  /* padding: 2rem; */

  max-width: 100%;

  & + div {
    margin-top: 3rem;
  }
`;

export const CastPerson = styled(Link)`
  display: block;
  padding-right: 0.5rem;

  img {
    border-radius: 3px;
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
