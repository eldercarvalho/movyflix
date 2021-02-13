import styled from 'styled-components';
import { animated } from 'react-spring';
import { Pagination, Dot } from '../../shared/Carousel/styles';

import devices from '../../../utils/media';

export const Container = styled.div`
  position: relative;
  margin-bottom: 8rem;
  height: 44vw;
  min-height: 600px;

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.accent};
  }

  ${Pagination} {
    position: absolute;
    right: 5vw;
    bottom: 4rem;

    svg {
      fill: #fff;
    }
  }

  ${Dot} {
    border: none;
    background: none;
    font-size: 2rem;
    transition: transform 0.3s;

    & + button {
      margin-left: 2rem;
    }

    &.--active {
      transform: translateY(-10px) scale(2.2);
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

export const BannerItem = styled(animated.div)`
  position: relative;
  overflow: hidden;
  height: 44vw;
  min-height: 500px;
  opacity: 0;
  transition: opacity 0.5s;

  &.show {
    opacity: 1;
  }

  img {
    position: absolute;
    object-fit: cover;
    width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(77deg, rgba(0, 0, 0, 0.7) 0, rgba(0, 0, 0, 0.1) 85%);
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, rgba(0, 0, 0, 9) 0, rgba(0, 0, 0, 0) 85%);
    pointer-events: none;
  }

  @media ${devices.tablet} {
    img {
      height: 100%;
    }

    &::after {
      height: 50px;
    }
  }
`;

export const BannerInfo = styled.div`
  position: absolute;
  bottom: 12%;
  left: 10vw;
  width: 600px;
  z-index: 2;

  h1 {
    font-size: 4rem;
    margin-bottom: 1.6rem;
    font-weight: 700;
  }

  p {
    line-height: 1.4;
    margin-bottom: 2rem;
  }

  div {
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      margin-left: 2.5rem;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 1.4rem;
    }
  }

  @media ${devices.tablet} {
    width: 100%;
    left: 0;
    padding: 0 1.6rem;

    h1 {
      font-size: 3rem;
    }
  }
`;
