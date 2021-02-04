import { rgba } from 'polished';
import styled, { css, keyframes } from 'styled-components';

interface IContainerProps {
  isDarken: boolean;
}

export const Container = styled.header<IContainerProps>`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  height: 68px;
  padding: 0 5rem;
  z-index: 10;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0));
  transition: background 0.7s;

  ${({ isDarken }) =>
    isDarken &&
    css`
      background: rgba(0, 0, 0, 0.8);
    `}
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
  margin: 0 5rem;

  a {
    display: flex;
    position: relative;
    padding: 0.5rem 0;
    font-size: 1.4rem;
    transition: 0.3s;
    font-weight: 600;

    &:hover:not(.--active) {
      opacity: 0.7;
    }

    & + a {
      margin-left: 5rem;
    }

    &.--active {
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

interface ISearchProps {
  isActive: boolean;
}

export const Search = styled.div<ISearchProps>`
  position: relative;
  margin-left: auto;

  button {
    position: relative;
    z-index: 1;
  }

  input {
    width: 40px;
    height: 40px;
    background: ${rgba('#000', 0.5)};
    font-size: 1.4rem;
    border: 1px solid #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    right: 0;
    color: #fff;
    padding: 0 1.6rem;
    opacity: 0;
    transform: translateY(-50%);
    transition: 0.3s;

    &::placeholder {
      color: ${rgba('#FFF', 0.5)};
    }

    ${({ isActive }) =>
      isActive &&
      css`
        width: 250px;
        opacity: 1;
      `}
  }
`;
