import styled, { css, keyframes } from 'styled-components';
import devices from '../../../utils/media';

import Button from '../../shared/Button';

interface ContainerProps {
  isDarken: boolean;
}

export const Container = styled.header<ContainerProps>`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  height: 68px;
  padding: 0 6rem;
  z-index: 10;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0));
  transition: background 0.5s;

  ${({ isDarken }) =>
    isDarken &&
    css`
      background: rgba(0, 0, 0, 0.9);
    `}

  @media ${devices.laptopM} {
    padding: 0 4rem;
  }

  @media ${devices.tablet} {
    height: 5.8rem;
    padding: 0 1.6rem;
  }
`;

interface MenuWrapperProps {
  isMenuOpened: boolean;
}

export const MenuWrapper = styled.div<MenuWrapperProps>`
  display: flex;
  align-items: center;

  @media ${devices.tablet} {
    position: fixed;
    right: 0;
    top: 0;
    padding-top: 6.8rem;
    background: #000;
    width: 260px;
    height: 100%;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.3s;
    z-index: 2;

    button {
      margin-top: 3rem;
    }

    ${({ isMenuOpened }) =>
      isMenuOpened &&
      css`
        transform: translateX(0);
      `}
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

export const Menu = styled.nav`
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

  @media ${devices.tablet} {
    flex-direction: column;
    margin: 0;

    a {
      & + a {
        margin-top: 3rem;
        margin-left: 0;
      }
    }
  }
`;

export const MenuButton = styled(Button)`
  display: none;
  position: relative;
  margin-left: 1.6rem;
  z-index: 3;

  svg {
    margin-top: 0.3rem;
  }

  @media ${devices.tablet} {
    display: initial;
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
`;

export const ModalContent = styled.div`
  h2 {
    margin-bottom: 2rem;
    font-weight: 600;
  }

  p {
    font-size: 1.6rem;

    & + p {
      margin-top: 1.6rem;
    }
  }
`;
