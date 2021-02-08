import styled from 'styled-components';
import { Pagination, Dot } from '../Carousel/styles';

export const Container = styled.div`
  position: relative;
  margin-bottom: 8rem;

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

export const BannerItem = styled.div`
  position: relative;
  overflow: hidden;
  height: 830px;

  img {
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
`;

export const BannerInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 10vw;
  width: 600px;

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
`;
