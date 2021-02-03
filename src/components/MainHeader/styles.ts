import styled, { keyframes } from 'styled-components';

export const Container = styled.header`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  height: 68px;
  padding: 0 5rem;
  z-index: 10;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0));
`;

export const Logo = styled.h1`
  font-weight: 300;

  a {
    span {
      font-family: 'Quicksand';
      font-weight: 600;
      color: ${(props) => props.theme.colors.accent};
    }
  }
`;

const activeItemAnimation = keyframes`
  0% {
    top: 0;
    height: 0px;
  }
  50% {
    top: 0;
    height: 100%;
  }
  100% {
    top: 100%;
    height: 3px;
  }
`;

export const Menu = styled.header`
  display: flex;
  align-items: center;
  margin-left: auto;

  a {
    display: flex;
    position: relative;
    padding: 0.5rem 0;
    font-size: 1.4rem;
    transition: 0.3s;
    font-weight: 600;

    &:hover:not(.--active) {
      color: ${({ theme }) => theme.colors.accent};
    }

    & + a {
      margin-left: 5rem;
    }

    &.--active {
      font-weight: 700;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        background: ${({ theme }) => theme.colors.accent};
        animation: ${activeItemAnimation} 0.3s linear forwards;
        z-index: -1;
      }
    }
  }
`;

export const SearchBar = styled.div``;
