import styled, { css } from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
`;

export const Track = styled.div`
  display: flex;
`;

interface ItemContainerProps {
  className?: string;
}

export const ItemContainer = styled.div<ItemContainerProps>`
  flex-shrink: 0;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.4rem;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  transition: 0.3s;

  :hover {
    opacity: 0.5;
  }

  svg {
    width: 50px;
    height: 30px;
    fill: #fff;
  }
`;

export const PrevNavButton = styled(NavButton)`
  left: 0;
`;

export const NextNavButton = styled(NavButton)`
  right: 0;
`;

export const Dots = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2.2rem;
  /* overflow-x: auto; */
`;

interface DotProps {
  isActive: boolean;
  showNumber: boolean;
}

export const Dot = styled.button<DotProps>`
  width: 20px;
  height: 4px;
  font-size: 0;
  color: #fff;
  border: none;
  background: rgba(255, 255, 255, 0.5);

  & + button {
    margin-left: 1rem;
  }

  ${({ showNumber }) =>
    showNumber &&
    css`
      font-size: 1.2rem;
      width: 20px;
      height: 20px;
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${({ theme }) => theme.colors.accent};
      border-color: ${({ theme }) => theme.colors.accent};
    `}
`;
