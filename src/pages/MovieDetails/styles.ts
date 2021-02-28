import { Link, LinkProps } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { Container as MovieActionsContainer } from '../../components/layout/MovieActions/styles';

import devices from '../../utils/media';

const FadeUp = keyframes`
  from { 
    top: 100px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
`;

export const CenterContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  animation: ${FadeUp} 1s forwards;

  > button {
    padding: 0;
    margin-bottom: 1.6rem;
  }
`;

export const MovieContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 33% 67%;
  gap: 0 5rem;
  margin-bottom: 3rem;

  @media ${devices.mobileL} {
    grid-template-columns: 100%;
    gap: 0;
  }
`;

export const Images = styled.div``;

export const Poster = styled.div`
  margin-bottom: 3rem;

  img {
    display: block;
    border-radius: 3px;
  }
`;

export const Info = styled.div`
  width: calc(100% - 5rem);

  p {
    line-height: 1.5;
    opacity: 0.8;
    font-size: 1.4rem;
    font-weight: 500;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export const Banner = styled.section`
  position: relative;
  background-size: cover;
  background-position: center center;
  margin-bottom: 3rem;

  h2 {
    font-size: 3rem;
    font-weight: 600;
    padding-right: 7rem;

    span {
      font-weight: 400;
      opacity: 0.8;
    }
  }

  ${MovieActionsContainer} {
    position: absolute;
    right: 0;
    bottom: 0;

    @media ${devices.mobileL} {
      position: relative;
    }
  }

  @media ${devices.mobileL} {
    h2 {
      font-size: 2.6rem;
    }
  }
`;

export const ShortSpecifications = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.4rem;
  margin-top: 0.5rem;

  span {
    position: relative;
    font-size: 1.4rem;
    font-weight: 500;
    display: inline-block;
    opacity: 0.8;

    & + span {
      margin-left: 2.2rem;

      ::before {
        content: '•';
        position: absolute;
        right: calc(100% + 0.8rem);
      }
    }

    &:last-of-type {
      white-space: nowrap;
    }
  }

  @media ${devices.mobileL} {
    margin-top: 2.4rem;
  }
`;

export const Specifications = styled.ul`
  margin-bottom: 2.4rem;

  li {
    list-style: none;
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;

    & + li {
      margin-top: 0.8rem;
    }

    strong {
      margin-right: 1rem;
    }
  }
`;

export const Crew = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem 2rem;
  max-width: 600px;
  width: 100%;

  li {
    list-style: none;
    color: rgba(255, 255, 255, 0.8);

    strong {
      display: block;
      font-size: 1.4rem;
    }

    span {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
`;

interface VoteAverageProps {
  color: string;
}

export const VoteAverage = styled.div<VoteAverageProps>`
  position: absolute;
  top: 0;
  right: 0;
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

export const InfoSection = styled.div`
  h3 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 1.6rem;
  }

  & + div {
    margin-top: 3rem;
  }
`;

interface CastPerson extends LinkProps {
  $hasImage: boolean;
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
  /* border: 3px solid transparent; */
  /* transition: border-color 0.3s;

  :hover {
    border-color: ${({ theme }) => theme.colors.accent};
  } */

  img {
    position: absolute;
    top: 10px;
    width: 100%;

    ${(props) =>
      props.$hasImage &&
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

export const Similar = styled.div`
  margin-bottom: 3rem;
`;
