import styled, { css, keyframes } from 'styled-components';

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

export const PersonContent = styled.div`
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

export const PersonImage = styled.div`
  margin-bottom: 3rem;

  img {
    display: block;
    border-radius: 3px;
  }
`;

export const Info = styled.div`
  position: relative;
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

export const PersonInfoList = styled.ul`
  list-style: none;
  margin: 1.2rem 0 3rem;

  li {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.4rem;

    & + li {
      margin-top: 0.5rem;
    }

    strong {
      font-weight: 600;
    }
  }
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

export const Socials = styled.div`
  position: absolute;
  top: 0%;
  right: 0;

  a {
    display: inline-block;

    & + a {
      margin-left: 1.6rem;
    }

    :hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  svg {
    transition: 0.3s;
  }

  @media ${devices.mobileL} {
    position: relative;
    margin: 0 0 3rem;
  }
`;
